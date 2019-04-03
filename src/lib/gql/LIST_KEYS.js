import { gql } from 'apollo-boost'

const LIST_KEYS = gql`
  query CBWEB_LIST_KEYS {
    apiKeys {
      listKeys {
        id
        roles
      }
    }
  }
`

export default LIST_KEYS
