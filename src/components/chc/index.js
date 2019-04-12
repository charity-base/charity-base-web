import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Col } from 'antd'
import CharitiesChart from './charts'
import CharitiesList from './list'
import CharitiesSearch from './search'
import SideBar from '../general/side-bar'
import { ContentLayout, ContentLayoutHeader } from '../general/Layout'
import FilterTags from './filter-tags'
import {
  addFilter,
  syncFilters,
  asyncFiltersIds,
  filtersListToObj,
  removeFilter,
  writeFiltersCache,
} from './helpers'
import { LIST_FILTERS } from '../../lib/gql'
import { Query } from 'react-apollo'

const {
  Content, Footer,
} = Layout


const CharitiesLayout = ({ filtersList, filtersObj, onAddFilter, onRemoveFilter }) => {
  const [hoveredItem, setHoveredItem] = useState({})
  return (
    <Layout>
      <SideBar />
      <ContentLayout>
        <ContentLayoutHeader
          large={filtersList.length > 0}
        >
          <CharitiesSearch
            onAddFilter={onAddFilter}
          />
          {filtersList.length > 0 ? (
            <FilterTags
              filtersList={filtersList}
              onClose={onRemoveFilter}
            />
          ) : null}
        </ContentLayoutHeader>
        <Content style={{
          background: '#fff',
          margin: '0 0 0 0',
          overflow: 'initial',
          zIndex: 1,
          position: 'relative',
          height: '100%',
        }}>
          <Row type='flex' style={{ position: 'relative', height: '100%' }} >
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ position: 'relative', height: '100%' }} >
              <CharitiesList
                filtersObj={filtersObj}
                onHover={setHoveredItem}
              />
            </Col>
            <Col xxl={12} xl={12} lg={12} md={0} sm={0} xs={0} style={{ position: 'relative', height: '100%' }} >
              <CharitiesChart
                filtersObj={filtersObj}
                hoveredItem={hoveredItem}
                onAddFilter={onAddFilter}
                onRemoveFilter={onRemoveFilter}
              />
            </Col>
          </Row>
        </Content>
        <Footer style={{
          background: '#fafafa',
          textAlign: 'center',
          padding: '0.5em 1em',
          fontSize: '0.8em',
          lineHight: '0.8em',
        }}>
          CharityBase 2019 - created open source by <a href='https://worthwhile.app'>worthwhile.app</a>
        </Footer>
      </ContentLayout>
    </Layout>
  )
}
CharitiesLayout.propTypes = {
}

const filtersStringToObj = filtersString => {
  try {
    const filtersObj = filtersString ? JSON.parse(filtersString) : {}
    return filtersObj
  } catch(e) {
    return {}
  }
}

class Charities extends Component {
  onAddFilter = (oldFilters, apolloClient) => item => {
    const filtersList = addFilter(oldFilters, item)
    this.updateFilters(filtersList, apolloClient)
  }
  onRemoveFilter = (oldFilters, apolloClient) => item => {
    const filtersList = removeFilter(oldFilters, item)
    this.updateFilters(filtersList, apolloClient)
  }
  updateFilters = (filtersList, apolloClient) => {
    const sortedFilters = writeFiltersCache(filtersList, apolloClient)
    const filtersObj = filtersListToObj(sortedFilters)
    const filtersString = JSON.stringify(filtersObj)
    if (filtersString !== this.props.filtersString) {
      this.props.onChange({ filters: filtersString })
    }
  }
  render() {
    const filtersObj = filtersStringToObj(this.props.filtersString)
    const gqlVars = { ids: asyncFiltersIds(filtersObj) }
    return (
      <Query
        query={LIST_FILTERS}
        variables={gqlVars}
      >
        {({ loading, error, data, client }) => {
          if (error) return 'err oops'
          const asyncFilters = data && data.CHC ? data.CHC.getFilters : [] //todo: add sync filters
          const filtersList = [
            ...asyncFilters,
            ...syncFilters(filtersObj),
          ].sort((a, b) => a.id.localeCompare(b.id))
          return (
            <CharitiesLayout
              // filtersLoading={loading} add this prop
              filtersList={filtersList}
              filtersObj={filtersObj}
              onAddFilter={this.onAddFilter(filtersList, client)}
              onRemoveFilter={this.onRemoveFilter(filtersList, client)}
            />
          )
        }}
      </Query>
    )
  }
}
Charities.propTypes = {
  filtersString: PropTypes.string,
  onChange: PropTypes.func,
}

export default Charities
