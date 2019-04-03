import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import { charityBaseGqlApiUri, charityBaseApiKey } from './lib/constants'
import auth from './lib/auth'
import { Router } from './Router'
import './App.scss'

class App extends Component {
  state = {
    accessToken: auth.accessToken,
  }
  componentDidMount() {
    auth.handleAuthentication(
      this.context.router.history,
      this.onAccessTokenChange,
    )
  }
  onAccessTokenChange = accessToken => {
    this.setState({ accessToken })
  }
  render() {
    const client = new ApolloClient({
      uri: charityBaseGqlApiUri,
      headers: {
        Authorization: `Apikey ${charityBaseApiKey}, Bearer ${this.state.accessToken || ''}`,
      },
    })
    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 320
    const isMobile = innerWidth < 992
    return (
      <ApolloProvider client={client}>
        <LocaleProvider locale={enGB}>
          <Router isMobile={isMobile}/>
        </LocaleProvider>
      </ApolloProvider>
    )
  }
}
App.contextTypes = {
  router: PropTypes.object,
}

export default App
