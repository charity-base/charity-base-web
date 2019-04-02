import React from 'react'
import { Layout } from 'antd'
import { ContentLayout } from '../general/Layout'
import ApiKeys from './ApiKeys'

const {
  Content, Footer, Sider,
} = Layout

const SIDER_WIDTH = 240

const ApiPortal = () => {
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
        Side Bar Content
      </Sider>
      <ContentLayout>
        <div style={{
          boxShadow: '0 0 1em',
          zIndex: 2,
        }}>
          Nav Content
        </div>
        <Content style={{
          background: '#fff',
          margin: '0 0 0 0',
          overflow: 'initial',
          zIndex: 1,
          position: 'relative',
          height: '100%',
        }}>
          <ApiKeys />
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
ApiPortal.propTypes = {
}

export default ApiPortal
