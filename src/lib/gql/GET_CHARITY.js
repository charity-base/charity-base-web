import { gql } from 'apollo-boost'

const GET_CHARITY = gql`
  query CBWEB_GET_CHARITY(
    $id: ID
  ) {
    CHC {
      getCharities(filters: { id: [$id] }) {
        list {
          activities
          areas {
            id
            name
          }
          beneficiaries {
            id
            name
          }
          causes {
            id
            name
          }
          contact {
            address
            email
            phone
            postcode
            social {
              platform
              handle
            }
          }
          finances(all: true) {
            income
            spending
            financialYear {
              end
            }
          }
          grants {
            id
            title
            description
            fundingOrganization {
              id
              name
            }
            amountAwarded
            currency
            awardDate
          }
          id
          names(all: true) {
            value
            primary
          }
          numPeople {
            employees
            trustees
            volunteers
          }
          operations {
            id
            name
          }
          orgIds {
            id
            rawId
            scheme
          }
          registrations(all: true) {
            registrationDate
            removalDate
            removalReason
          }
          website
        }
      }
    }
  }
`

export default GET_CHARITY
