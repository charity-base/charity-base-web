import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import { charityBaseGqlApiUri, charityBaseApiKey } from './lib/constants'
import auth from './lib/auth'
import Router from './Router'
import './App.scss'

const client = new ApolloClient({
  uri: charityBaseGqlApiUri,
  request: operation => {
    const { user } = auth
    operation.setContext({
      headers: {
        Authorization: `Apikey ${charityBaseApiKey}`,
        UserId: user ? user.sub : undefined,
      },
    })
  }
})

class App extends Component {
  componentDidMount() {
    auth.handleAuthentication(
      this.context.router.history,
    )
  }
  render() {
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
