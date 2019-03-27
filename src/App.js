import React, { Component, Fragment } from 'react'
import { Router } from './Router'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import AuthHandler from './components/general/AuthHandler'
import './App.scss'

class App extends Component {
  render() {
    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 320
    const isMobile = innerWidth < 992
    return (
      <LocaleProvider locale={enGB}>
        <Fragment>
          <Router isMobile={isMobile}/>
          <AuthHandler />
        </Fragment>
      </LocaleProvider>
    )
  }
}

export default App
