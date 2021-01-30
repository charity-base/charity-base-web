import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import { ContentLayout } from '../general/Layout'
import SideBar from '../general/side-bar'
import GettingStarted from './getting-started'
import Elements from './elements'
import ApiKeys from './api-keys'
import Playground from './playground'

const {
  Content
} = Layout

const ApiPortal = () => {
  const [playgroundKey, setPlaygroundKey] = useState(undefined)
  return (
    <Layout>
      <SideBar />
      <ContentLayout>
        <Content style={{
          margin: 0,
          overflow: 'initial',
          zIndex: 1,
          position: 'relative',
          height: '100%',
        }}>
          <Switch>
            <Route exact path="/api-portal" render={() => (
              <GettingStarted />
            )} />
            <Route exact path="/api-portal/elements" render={() => (
              <Elements />
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
      </ContentLayout>
    </Layout>
  )
}
ApiPortal.propTypes = {
}

export default ApiPortal
