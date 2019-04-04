import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
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
  { path: '', label: 'Getting Started' },
  { path: 'keys', label: 'API Keys' },
  { path: 'playground', label: 'Playground' },
  { path: 'docs', label: 'Docs' },
]

const ApiPortal = () => {
  const [playgroundKey, setPlaygroundKey] = useState(undefined)
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
        />
      </Sider>
      <ContentLayout>
        <Content style={{
          background: '#fff',
          margin: '0 0 0 0',
          overflow: 'initial',
          zIndex: 1,
          position: 'relative',
          height: '100%',
        }}>
          <Switch>
            <Route exact path="/api-portal" render={() => (
              <div>The API is useful.</div>
            )} />
            <Route path="/api-portal/keys" render={() => (
              <ApiKeys
                setPlaygroundKey={setPlaygroundKey}
              />
            )} />
            <Route path="/api-portal/playground" render={() => (
              <Playground
                apiKey={playgroundKey}
                setApiKey={setPlaygroundKey}
              />
            )} />
            <Redirect to="/api-portal"/>
          </Switch>
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
