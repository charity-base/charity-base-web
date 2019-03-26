import { gql } from 'apollo-boost'

const LIST_FILTERS = gql`
  query CBWEB_LIST_FILTERS(
    $id: [ID]
    $prefix: String
  ) {
    CHC {
      getFilters(
        id: $id
        prefix: $prefix
      ) {
        id
        filterType
        value
        label
      }
    }
  }
`

export default LIST_FILTERS
