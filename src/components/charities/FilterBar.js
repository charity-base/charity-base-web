import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Divider } from 'antd'
import { DownloadResults } from '../general/download'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'
import { Query } from 'react-apollo'
import { COUNT_CHARITIES } from '../../lib/gql'

const formatCount = x => numeral(x).format('0,0')

const ResultsCount = ({ filters }) => (
  <div style={{ height: '30px', marginTop: '20px', textAlign: 'center' }}>
    <Query query={COUNT_CHARITIES} variables={{ filters }}>
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
  filters: PropTypes.object.isRequired,
}

const FilterBar = ({ queryString, query }) => (
  <div>
    <MenuBarHeader>
      <Filters queryString={queryString} />
      <Divider />
      <ResultsCount
        filters={{}} // todo: use value from query string
      />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString}/></div>
    </MenuBarHeader>
  </div>
)
FilterBar.propTypes = {
  queryString: PropTypes.string,
  query: PropTypes.object,
}

export { FilterBar }
