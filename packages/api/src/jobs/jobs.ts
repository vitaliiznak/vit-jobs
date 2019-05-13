import { gql } from "apollo-server-express"

export const typeDefs = gql`
  input JobInput {
    title: String!
    description: String!
    employmentType: String!
    categoty: String!
    edutation: String!
    hoursFrom: Float!
    hoursTo: Float!
    experienceYears: Float!
  }

  type Job {
    id: ID!
    title: String!
    description: String!
    employmentType: String!
    categoty: String!
    edutation: String!
    hoursFrom: Float!
    hoursTo: Float!
    experienceYears: Float!
  }

  extend type Query {
    jobs: [Job]!
  }
`

export const resolvers = {
  Query: {
    jobs: () => [],
  },
}
