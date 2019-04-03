import ApolloClient from 'apollo-boost'
import auth from './auth'
import { charityBaseGqlAuthUri } from './constants'

const authApolloClient = new ApolloClient({
  uri: charityBaseGqlAuthUri,
  request: operation => {
    // ensure we use the latest access token:
    operation.setContext({
      headers: {
        Authorization: `Bearer ${auth.accessToken || ''}`,
      },
    })
  }
})

export default authApolloClient
