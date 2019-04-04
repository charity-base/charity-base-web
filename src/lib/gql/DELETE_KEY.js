import { gql } from 'apollo-boost'

const DELETE_KEY = gql`
  mutation CBWEB_DELETE_KEY(
    $id: ID!
  ) {
    apiKeys {
      deleteKey(
        id: $id
      ) {
        id
      }
    }
  }
`

export default DELETE_KEY
