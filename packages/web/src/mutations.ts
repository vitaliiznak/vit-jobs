import gql from 'graphql-tag'

export const CREATE_JOB = gql`
  mutation CREATE_JOB($input: JobInput!) {
    createJob(input: $input) {
      id
    }
  }
`
