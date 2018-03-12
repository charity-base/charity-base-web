import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Layout, Breadcrumb } from 'antd'

const { Content, Sider } = Layout


class FAQ extends Component {
  render() {
    return (
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>charitybase.uk</Breadcrumb.Item>
          <Breadcrumb.Item>faq</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            menu of FAQ's
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            selected FAQ content
          </Content>
        </Layout>
      </Content>
    )
  }
}
FAQ.propTypes = {
  queryString: PropTypes.string,
}

export { FAQ }
