import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FilterBar } from './FilterBar'
import { CharitiesSearch } from './CharitiesSearch'
import { CharitiesList } from './CharitiesList'

import { Layout, Breadcrumb } from 'antd'

const { Content, Sider } = Layout


class Charities extends Component {
  render() {
    const { query, queryString } = this.props
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>charitybase.uk</Breadcrumb.Item>
          <Breadcrumb.Item>charities{queryString}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ position: 'relative', padding: '24px 0', background: '#fff', height: '50vh !important', maxHeight: '50vh !important', overflowY: 'scroll' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <FilterBar queryString={queryString} />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <CharitiesSearch query={query} />
            <CharitiesList queryString={queryString} />
          </Content>
        </Layout>
      </Content>
    )
  }
}
Charities.propTypes = {
  query: PropTypes.object,
  queryString: PropTypes.string,
}

export { Charities }
