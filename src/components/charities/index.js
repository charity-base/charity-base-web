import React, { useState } from 'react'
import { Layout, Row, Col } from 'antd'
import CharitiesChart from './charts'
import CharitiesList from './list'
import CharitiesSearch from './search'
import SideBar from './side-bar'
import { ContentLayout, ResponsiveScroll } from '../general/Layout'
import { filtersListToObj, addFilter, removeFilter } from './helpers'

const {
  Content, Footer, Sider,
} = Layout

const SIDER_WIDTH = 240

const Charities = () => {
  const [hoveredItem, setHoveredItem] = useState({})
  const [filtersList, setFiltersList] = useState([])
  const filtersObj = filtersListToObj(filtersList)
  return (
    <Layout>
      <Sider
        width={SIDER_WIDTH}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          color: 'rgba(255,255,255,0.8)',
        }}
      >
        <SideBar
          filtersList={filtersList}
          onRemoveFilter={item => setFiltersList(removeFilter(filtersList, item))}
        />
      </Sider>
      <ContentLayout>
        <div style={{
          boxShadow: '0 0 1em',
          zIndex: 2,
        }}>
          <CharitiesSearch
            onAddFilter={item => setFiltersList(addFilter(filtersList, item))}
          />
        </div>
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
              <ResponsiveScroll>
                <CharitiesList
                  filtersObj={filtersObj}
                  onHover={setHoveredItem}
                />
              </ResponsiveScroll>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={0} sm={0} xs={0} style={{ position: 'relative', height: '100%' }} >
              <CharitiesChart
                filtersObj={filtersObj}
                hoveredItem={hoveredItem}
                onAddFilter={item => setFiltersList(addFilter(filtersList, item))}
                onRemoveFilter={item => setFiltersList(removeFilter(filtersList, item))}
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
Charities.propTypes = {
}

export default Charities
