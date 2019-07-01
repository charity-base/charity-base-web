import { gql } from 'apollo-boost'

const LIST_CHARITIES = gql`
  query CBWEB_LIST_CHARITIES(
    $filters: FilterCHCInput!
    $skip: Int
    $sort: SortCHC
  ) {
    CHC {
      getCharities(filters: $filters) {
        count
        list(limit: 10, skip: $skip, sort: $sort) {
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
          contact {
            social {
              platform
              handle
            }
          }
          image {
            logo {
              small
            }
          }
        }
      }
    }
  }
`

export default LIST_CHARITIES
