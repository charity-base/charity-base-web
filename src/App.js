import React, { Component } from 'react'
import { LocaleProvider, Layout } from 'antd'
import './App.css'
import enGB from 'antd/lib/locale-provider/en_GB'

import { Router } from './Router'

import { NavBar } from './components/nav'

class App extends Component {
  render() {
    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 320
    const isMobile = innerWidth < 768
    return (
      <LocaleProvider locale={enGB}>
        <Layout style={{ height: '100vh' }}>
          <Router isMobile={isMobile}/>
          <NavBar isMobile={isMobile} />
        </Layout>
      </LocaleProvider>
    )
  }
}

export default App;
