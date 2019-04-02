import { gql } from 'apollo-boost'

const CREATE_KEY = gql`
  mutation CBWEB_CREATE_KEY {
    apiKeys {
      create {
        id
        roles
      }
    }
  }
`

export default CREATE_KEY
