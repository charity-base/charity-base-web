import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Query } from 'react-apollo'
import { COUNT_CHARITIES } from '../../../lib/gql'

const formatCount = x => numeral(x).format('0,0')

const ResultsCount = ({ filtersObj }) => (
  <div style={{ height: '30px', marginTop: '20px', textAlign: 'center' }}>
    <Query query={COUNT_CHARITIES} variables={{ filters: filtersObj }}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...'
        if (error) return 'Error :('
        return (
          `${formatCount(data.CHC.getCharities.count)} charities`
        )
      }}
    </Query>
  </div>
)
ResultsCount.propTypes = {
  filtersObj: PropTypes.object.isRequired,
}

export default ResultsCount
