import { gql } from 'apollo-boost'

const AGG_GEOHASH_CHARITIES = gql`
  query CBWEB_AGG_GEOHASH_CHARITIES(
    $filters: FilterCHCInput!
    $top: Float
    $left: Float
    $bottom: Float
    $right: Float
  ) {
    CHC {
      getCharities(filters: $filters) {
        aggregate {
          geo(
            top: $top
            left: $left
            bottom: $bottom
            right: $right
          ) {
            geohash {
              buckets {
                key
                name
                count
              }
            }
          }
        }
      }
    }
  }
`

export default AGG_GEOHASH_CHARITIES
