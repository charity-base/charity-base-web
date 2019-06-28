import { gql } from 'apollo-boost'

const DOWNLOAD_CHARITIES = gql`
  query CBWEB_DOWNLOAD_CHARITIES(
    $filters: FilterCHCInput!
  ) {
    CHC {
      getCharities(filters: $filters) {
        download {
          url
          size
        }
      }
    }
  }
`

export default DOWNLOAD_CHARITIES
