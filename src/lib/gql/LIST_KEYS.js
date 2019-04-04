import { gql } from 'apollo-boost'

const LIST_KEYS = gql`
  query CBWEB_LIST_KEYS {
    apiKeys {
      listKeys {
        id
        roles
        createdAt
      }
    }
  }
`

export default LIST_KEYS
