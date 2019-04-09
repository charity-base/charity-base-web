import React, { Component, useState } from 'react'
import { Layout, Row, Col } from 'antd'
import CharitiesChart from './charts'
import CharitiesList from './list'
import CharitiesSearch from './search'
import SideBar from './side-bar'
import { ContentLayout } from '../general/Layout'
import { filtersListToObj, addFilter, removeFilter } from './helpers'

const {
  Content, Footer, Sider,
} = Layout

const SIDER_WIDTH = 240

const CharitiesLayout = ({ filtersList, filtersObj, onAddFilter, onRemoveFilter }) => {
  const [hoveredItem, setHoveredItem] = useState({})
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
          onRemoveFilter={onRemoveFilter}
        />
      </Sider>
      <ContentLayout>
        <div style={{
          boxShadow: '0 0 1em',
          zIndex: 2,
        }}>
          <CharitiesSearch
            onAddFilter={onAddFilter}
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

class Charities extends Component {
  state = {
    filtersList: [],
  }
  componentDidMount() {
    // get filters query string from prop
    // convert to filtersIdsList
    // fetch filters from gql getFilters
    // add syncronous filters
    // order by alphabetical id
    // set filtersList state
  }
  componentDidUpdate() {
    // check if filters query string prop has changed
  }
  onAddFilter = item => {
    const { filtersList } = this.state
    this.setState({ filtersList: addFilter(filtersList, item) })
  }
  onRemoveFilter = item => {
    const { filtersList } = this.state
    this.setState({ filtersList: removeFilter(filtersList, item) })
  }
  render() {
    const { filtersList } = this.state
    const filtersObj = filtersListToObj(filtersList)
    return (
      <CharitiesLayout
        filtersList={filtersList}
        filtersObj={filtersObj}
        onAddFilter={this.onAddFilter}
        onRemoveFilter={this.onRemoveFilter}
      />
    )
  }
}
// todo add filters string as a prop

export default Charities
