import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import auth from './lib/auth'
import { Router } from './Router'
import './App.scss'

class App extends Component {
  componentDidMount() {
    auth.handleAuthentication(this.context.router.history)
    auth.scheduleRenewal()
  }
  render() {
    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 320
    const isMobile = innerWidth < 992
    return (
      <LocaleProvider locale={enGB}>
        <Router isMobile={isMobile}/>
      </LocaleProvider>
    )
  }
}
App.contextTypes = {
  router: PropTypes.object,
}

export default App
