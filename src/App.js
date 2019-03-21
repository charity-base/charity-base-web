import React, { Component } from 'react'
import { LocaleProvider, Layout } from 'antd'
import './App.scss'
import enGB from 'antd/lib/locale-provider/en_GB'
import { Router } from './Router'
import { NavBar } from './components/nav'
import AuthHandler from './components/general/AuthHandler'

class App extends Component {
  render() {
    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 320
    const isMobile = innerWidth < 992
    return (
      <LocaleProvider locale={enGB}>
        <Layout>
          <Router isMobile={isMobile}/>
          <NavBar isMobile={isMobile} />
          <AuthHandler />
        </Layout>
      </LocaleProvider>
    )
  }
}

export default App
