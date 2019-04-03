import React, { useState } from 'react'
import { Layout } from 'antd'
import { ContentLayout } from '../general/Layout'
import ApiKeys from './api-keys'
import SideBarContent from './side-bar'
import Playground from './playground'

const {
  Content, Footer, Sider,
} = Layout

const SIDER_WIDTH = 240

const MENU_ITEMS = [
  { id: 'overview', text: 'Overview', icon: 'api' },
  { id: 'keys', text: 'API Keys', icon: 'key' },
  { id: 'playground', text: 'Playground', icon: 'code' },
  { id: 'docs', text: 'Docs', icon: 'book' },
]

const ApiPortal = () => {
  const [itemId, setItemId] = useState(MENU_ITEMS[2].id)
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
        <SideBarContent
          menuItems={MENU_ITEMS}
          onSelect={setItemId}
          selectedId={itemId}
        />
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
          {itemId === 'overview' ? (
            <div>The API is useful.</div>
          ) : null}
          {itemId === 'keys' ? (
            <ApiKeys />
          ) : null}
          {itemId === 'playground' ? (
            <Playground />
          ) : null}
          {itemId === 'docs' ? (
            <div>README and link to github go here</div>
          ) : null}
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
