import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FilterBar } from './FilterBar'
import { CharitiesSearch } from './CharitiesSearch'
import { CharitiesSort } from './CharitiesSort'
import { CharitiesList } from './CharitiesList'
import { Layout } from 'antd'

const { Content, Sider } = Layout


const FixedHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  padding: 24px;
  background-color: #FFF;
  z-index: 999;
`

const ScrollableContent = styled.div`
  padding: 120px 24px 24px 24px;
  height: 100%;
  overflow-y: scroll;
`


class Charities extends Component {
  render() {
    const { query, queryString } = this.props
    return (
      <Content style={{ position: 'fixed', top: '80px', bottom: '20px', left: '50px', right: '50px', margin: 0, padding: 0 }}>
        <Layout style={{ background: '#FFF', border: '1px solid #DDD', borderRadius: '5px', overflowY: 'scroll', position: 'relative', height: '100%' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <FilterBar queryString={queryString} />
          </Sider>
          <Content style={{ position: 'relative' }}>
            <FixedHeader>
              <CharitiesSearch query={query} />
              <CharitiesSort query={query} />
            </FixedHeader>
            <ScrollableContent>
              <CharitiesList queryString={queryString} />
            </ScrollableContent>
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
