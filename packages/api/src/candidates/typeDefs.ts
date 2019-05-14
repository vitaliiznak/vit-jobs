import { gql } from "apollo-server-express"

export default gql`
  input JobInput {
    title: String!

    salaryRange: [Float]
    #aux_data
    category: String
    employmentType: String
    edutation: String
    experienceYears: Float
    hoursPerWeek: Float

    # address
    country: String!
    state: String!
    city: String!
    zipcode: String!

    description: String!
    attachments: [Upload]!
  }

  type Job {
    id: ID!
    title: String!
    salaryRange: [Float]
    employmentType: String
    category: String
    edutation: String
    experienceYears: Float
    hoursPerWeek: Float

    # address
    country: String!
    state: String!
    city: String!
    zipcode: String!
    #
    description: String!
    attachments: [Upload]!
  }

  extend type Query {
    jobs: [Job]!
    job(id: String): Job
  }

  extend type Mutation {
    createJob(input: JobInput!): Job
  }
`
