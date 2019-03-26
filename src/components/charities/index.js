import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Col } from 'antd'
import CharitiesChart from './charts'
import CharitiesList from './list'
import CharitiesSearch from './search'
import SideBar from './side-bar'
import { FixedHeader, ScrollableContent, Page, ResponsiveSider, HEADER_HEIGHT } from '../general/Layout'
import { filtersListToObj, addFilter, removeFilter } from './helpers'


const Charities = ({ query, queryString, isMobile }) => {
  const [hoveredItem, setHoveredItem] = useState({})
  const [filtersList, setFiltersList] = useState([])
  const filtersObj = filtersListToObj(filtersList)
  console.log(JSON.stringify(filtersObj))
  return (
    <Page isMobile={isMobile}>
      <ResponsiveSider isMobile={isMobile}>
        <SideBar
          filtersObj={filtersObj}
          filtersList={filtersList}
          onRemoveFilter={item => setFiltersList(removeFilter(filtersList, item))}
        />
      </ResponsiveSider>
      <Layout.Content style={{ position: 'relative', backgroundColor: '#FFF', height: '100%' }}>
        <FixedHeader isMobile={isMobile}>
          <CharitiesSearch
            onAddFilter={item => setFiltersList(addFilter(filtersList, item))}
          />
        </FixedHeader>
        <Row type='flex' style={{ height: '100%' }}>
          <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24} style={{ height: '100%' }}>
            <ScrollableContent isMobile={isMobile}>
              <CharitiesList
                filtersObj={filtersObj}
                onHover={setHoveredItem}
              />
            </ScrollableContent>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={0} sm={0} xs={0} style={{ paddingTop: HEADER_HEIGHT, height: '100%' }}>
            <CharitiesChart
              filtersObj={filtersObj}
              hoveredItem={hoveredItem}
              onAddFilter={item => setFiltersList(addFilter(filtersList, item))}
              onRemoveFilter={item => setFiltersList(removeFilter(filtersList, item))}
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

export default Charities
