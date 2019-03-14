import { gql } from 'apollo-boost'

const LIST_CHARITIES = gql`
  query CBWEB_LIST_CHARITIES(
    $filters: FilterCHCInput!
    $skip: Int
  ) {
    CHC {
      getCharities(filters: $filters) {
        count
        list(limit: 10, skip: $skip) {
          id
          names(all: true) {
            value
            primary
          }
          activities
          geo {
            latitude
            longitude
          }
          finances {
            income
          }
        }
      }
    }
  }
`

export default LIST_CHARITIES
