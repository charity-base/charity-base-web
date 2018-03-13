import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import './App.css'

import { LocaleProvider, Layout, Menu } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'

import { Router } from './Router'

const { Header, Footer } = Layout;

const HeaderTitle = styled(NavLink)`
  color: #EC407A;
  line-height: 59px;
  font-size: 32px;
  letter-spacing: 3px;
  font-weight: 500;
  height: 59px;
  margin: 2px 28px 2px 0;
  float: left;
  :hover {
    color: #D81B60;
  }
`

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={enGB}>
        <Layout>
          <Header>
            <HeaderTitle to="/">CharityBase</HeaderTitle>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
              selectable={false}
            >
              <Menu.Item key="1">
                <NavLink
                  to="/"
                  exact
                  activeStyle={{
                    color: 'rgba(255,255,255,0.9)',
                   }}
                >Charities</NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink
                  to="/faq"
                  activeStyle={{
                    color: 'rgba(255,255,255,0.9)',
                   }}
                >FAQ</NavLink>
              </Menu.Item>
              <Menu.Item key="3"><a href="https://charitybase.uk/docs">API Documentation</a></Menu.Item>
            </Menu>
          </Header>
          <Router />
          <Footer style={{ textAlign: 'center' }}>
            CharityBase 2018 | <a href='https://github.com/tythe-org'>github.com/tythe-org</a>
          </Footer>
        </Layout>
      </LocaleProvider>
    )
  }
}

export default App;
