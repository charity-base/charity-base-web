import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FilterBar } from './FilterBar'
import CharitiesSearch from './search'
import { CharitiesSort } from './CharitiesSort'
import { CharitiesList } from './CharitiesList'
import { Layout, Row, Col } from 'antd'
import { FixedHeader, ScrollableContent, Page, ResponsiveSider } from '../general/Layout'
import CharitiesChart from './charts'

const Charities = ({ query, queryString, isMobile }) => {
  const [hoveredItem, setHoveredItem] = useState({})
  const [filters, setFilters] = useState({}) // todo: get from query string
  return (
    <Page isMobile={isMobile}>
      <ResponsiveSider isMobile={isMobile}>
        <FilterBar
          filters={filters}
          queryString={queryString}
        />
      </ResponsiveSider>
      <Layout.Content style={{ position: 'relative', backgroundColor: '#FFF', height: '100%' }}>
        <FixedHeader isMobile={isMobile}>
          <CharitiesSearch
            filters={filters}
            setFilters={setFilters}
          />
          <CharitiesSort query={query} />
        </FixedHeader>
        <Row type='flex' style={{ height: '100%' }}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ height: '100%' }}>
            <ScrollableContent isMobile={isMobile}>
              <CharitiesList
                filters={filters}
                onHover={setHoveredItem}
              />
            </ScrollableContent>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={0} sm={0} xs={0} style={{ paddingTop: 150, height: '100%' }}>
            <CharitiesChart
              filters={filters}
              hoveredItem={hoveredItem}
              setFilters={setFilters}
            />
          </Col>
        </Row>
      </Layout.Content>
    </Page>
  )
}
Charities.propTypes = {
  query: PropTypes.object,
  queryString: PropTypes.string,
  isMobile: PropTypes.bool,
}

export { Charities }
