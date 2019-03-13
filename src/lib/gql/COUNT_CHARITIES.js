import { gql } from 'apollo-boost'

const COUNT_CHARITIES = gql`
  query CBWEB_COUNT_CHARITIES($filters: FilterCHCInput!) {
    CHC {
      getCharities(filters: $filters) {
        count
      }
    }
  }
`

export default COUNT_CHARITIES
