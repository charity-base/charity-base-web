import { gql } from 'apollo-boost'

const CREATE_KEY = gql`
  mutation CBWEB_CREATE_KEY {
    apiKeys {
      createKey {
        id
        roles
      }
    }
  }
`

export default CREATE_KEY
