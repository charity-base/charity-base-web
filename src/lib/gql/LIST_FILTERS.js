import { gql } from 'apollo-boost'

const LIST_FILTERS = gql`
  query CBWEB_LIST_FILTERS(
    $ids: [ID]
  ) {
    CHC {
      getFilters(id: $ids) {
        id
        value
        label
        filterType
      }
    }
  }
`

export default LIST_FILTERS
