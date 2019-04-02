import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './index.css'
import App from './App'
import { unregister } from './registerServiceWorker'
// import registerServiceWorker from './registerServiceWorker'
import { charityBaseGqlApiUri, charityBaseApiKey } from './lib/constants'
import auth from './lib/auth'

const client = new ApolloClient({
  uri: charityBaseGqlApiUri,
  headers: {
    Authorization: `Apikey ${charityBaseApiKey}, Bearer ${auth.accessToken || ''}`,
  },
})

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

unregister()
// registerServiceWorker()
