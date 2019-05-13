const { gql } = require("apollo-server")

const typeDef = gql`
  type Candidate {
    name: String
  }
  extend type Query {
    candidates: [Candidate]
  }
`

module.exports = {
  typeDef,
}
