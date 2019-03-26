import React from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Divider, Tag, Icon } from 'antd'
import { DownloadResults } from '../general/download'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
// import { Filters } from './filters'
import { Query } from 'react-apollo'
import { COUNT_CHARITIES, LIST_FILTERS } from '../../lib/gql'
import { SideBarTitle } from '../general/InfoText'
import mapItem from './search/mapItem' // todo: move to helpers folder
import reduceFilters from './search/reduceFilters' // todo: move to helpers folder
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

const LIST_LOGIC = 'some'

const Tags = ({ filtersList, onClose }) => (
  filtersList.map((x, i) => {
    const { icon, primary } = mapItem(x)
    return (
      <div>
      <Tag
        key={x.id}
        closable
        afterClose={() => onClose(x)}
        color='#EC407A'
        style={{
          cursor: 'default',
          borderColor: '#EC407A',
          marginBottom: '4px',
          // boxSizing: 'border-box',
          // overflow: 'hidden',
          // textOverflow: 'ellipsis',
        }}
        title={primary}
      >
        {icon}
        <span style={{ marginLeft: '5px' }}>
          {primary.length > 16 ? `${primary.slice(0, 16).trim()}...` : primary}
        </span>
      </Tag>
      </div>
    )
  })
)

const DummyTags = ({ count }) => (
  [...new Array(count)].map((x, i) => {
    return (
      <div>
        <Tag
          key={i}
          color='#EC407A'
          style={{
            cursor: 'default',
            borderColor: '#EC407A',
            marginBottom: '4px',
            opacity: 0.9,
            width: '100px',
            // boxSizing: 'border-box',
            // overflow: 'hidden',
            // textOverflow: 'ellipsis',
          }}
        >
          ...
        </Tag>
      </div>
    )
  })
)

const getFiltersIds = filters => {
  const { search, areas, causes, beneficiaries, operations, grants } = filters
  return [
    ...(areas && areas[LIST_LOGIC] ? (
      areas[LIST_LOGIC].map(value => `area-${value}`)
    ) : []),
    ...(causes && causes[LIST_LOGIC] ? (
      causes[LIST_LOGIC].map(value => `cause-${value}`)
    ) : []),
    ...(beneficiaries && beneficiaries[LIST_LOGIC] ? (
      beneficiaries[LIST_LOGIC].map(value => `beneficiary-${value}`)
    ) : []),
    ...(operations && operations[LIST_LOGIC] ? (
      operations[LIST_LOGIC].map(value => `operation-${value}`)
    ) : []),
    ...(grants && grants.funders && grants.funders[LIST_LOGIC] ? (
      grants.funders[LIST_LOGIC].map(value => `funder-${value}`)
    ) : []),
  ]
}

const Filters = ({ filters, setFilters }) => {
  const asyncFilterIds = getFiltersIds(filters)
  const syncFiltersList = [
    ...(filters.search ? [{
      id: 'search-',
      filterType: 'search',
      value: filters.search,
    }] : []),
    ...(filters.geo && filters.geo.boundingBox ? [{
      id: 'geo-',
      filterType: 'geo',
      value: filters.geo.boundingBox,
    }] : []),
  ]
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <Tags
        filtersList={syncFiltersList}
        onClose={x => {
          setFilters(reduceFilters(filters, x.filterType, x.value, true))
        }}
      />
      <Query query={LIST_FILTERS} variables={{ id: asyncFilterIds }}>
        {({ loading, error, data }) => {
          if (loading) return <DummyTags count={asyncFilterIds.length} />
          if (error) return 'Error :('
          return (
            <Tags
              filtersList={data.CHC.getFilters}
              onClose={x => {
                setFilters(reduceFilters(filters, x.filterType, x.value, true))
              }}
            />
          )
        }}
      </Query>
    </div>
  )
}
Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
}

const FilterBar = ({ filters, queryString, query, setFilters }) => (
  <div>
    <MenuBarHeader>
      <SideBarTitle>
        <Icon type='filter' style={{ marginRight: '10px' }}/>
        FILTERS
      </SideBarTitle>
      <Filters
        filters={filters}
        setFilters={setFilters}
      />
      <Divider />
      <ResultsCount
        filters={filters}
      />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString} /></div>
    </MenuBarHeader>
  </div>
)
FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  queryString: PropTypes.string,
  setFilters: PropTypes.func.isRequired,
}

export { FilterBar }
