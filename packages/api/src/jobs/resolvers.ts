import * as SqlString from "sqlstring"

import { executeWithConnection } from "../dbConnection"
import { saveAssets } from "../utils"

const sqlEscape = SqlString.escape.bind(SqlString)

const SELECT_FIELDS = `
id,
title,

salary_range as "salaryRange",

address::json->>'country' as country,
address::json->>'state' as state,
address::json->>'city' as city,


aux_data::json->>'category' as category,
aux_data::json->>'edutation' as edutation,
aux_data::json->>'experienceYears' as experienceYears,
aux_data::json->>'hoursPerWeek' as hoursPerWeek,

description,
logo,
attachments

/*meta*/
status
`

const jobResponseFormatter = (el) => ({
  ...el,
  salaryRange: JSON.parse(el.salaryRange),
})

const createJob = (
  _,
  {
    input: {
      title,
      employmentType,
      category,
      edutation,
      experienceYears,
      hoursPerWeek,
      salaryRange = [0, 0],
      country,
      state,
      city,
      zipcode,
      description,
      logo,
      attachments = [],
    },
  },
) =>
  executeWithConnection(async (conn) => {
    const logosArrayData = await saveAssets(logo ? [logo] : [])
    const logoData = logosArrayData.length ? logosArrayData[0] : null
    const attachmentsArrayData = await saveAssets(attachments)
    const escTitle = sqlEscape(title)
    const escSalary = `'[${Number(salaryRange[0])}, ${Number(
      salaryRange[1],
    )}]'`
    const escAddress = `'${JSON.stringify({
      country,
      state,
      city,
      zipcode,
    })}'`
    const escAuxData = `'${JSON.stringify({
      category,
      employmentType,
      edutation,
      experienceYears,
      hoursPerWeek,
    })}'`
    const escDesc = sqlEscape(description)

    const sqlString = `
    INSERT INTO job
      (title, salary_range, address, aux_data, description, logo, attachments)
    VALUES(
      ${escTitle},
      ${escSalary},
      ${escAddress},
      ${escAuxData},
      ${escDesc},
      '${JSON.stringify(logoData)}',
      '${JSON.stringify(attachmentsArrayData)}'
      )
    RETURNING ${SELECT_FIELDS}
    `

    const result = await conn.query(sqlString)
    if (result.rowCount < 1) {
      throw new Error("JOB NOT CREATED")
    }
    const rowsFormatted = result.rows.map(jobResponseFormatter)

    return rowsFormatted[0]
  })

const job = ({ id }) =>
  executeWithConnection(async (conn) => {
    const sqlString = `
    SELECT
        ${SELECT_FIELDS}
    FROM job
    WHERE id=${sqlEscape(id)}
  `
    const result = await conn.query(sqlString)
    if (result.rowCount < 1) {
      return null
    }
    const rowsFormatted = result.rows.map(jobResponseFormatter)

    return rowsFormatted[0]
  })

const jobs = () =>
  executeWithConnection(async (conn) => {
    const sqlString = `
    SELECT
        ${SELECT_FIELDS}
    FROM job
  `
    const result = await conn.query(sqlString)
    return result.rows.map((el) => ({
      ...el,
      salaryRange: JSON.parse(el.salaryRange),
    }))
  })

export default {
  Query: {
    job,
    jobs,
  },
  Mutation: {
    createJob,
  },
}
