import gql from 'graphql-tag'

export const GET_JOBS = gql`
  query GET_JOBS {
    jobs {
      id
      title
      salaryRange

      category
      edutation
      experienceYears
      hoursPerWeek

      description
    }
  }
`
