import { gql } from 'apollo-boost'

const AGG_INCOME_CHARITIES = gql`
  query CBWEB_AGG_INCOME_CHARITIES(
    $filters: FilterCHCInput!
  ) {
    CHC {
      getCharities(filters: $filters) {
        aggregate {
          finances {
            latestIncome {
              buckets {
                key
                name
                count
                sum
              }
            }
          }
        }
      }
    }
  }
`

export default AGG_INCOME_CHARITIES
