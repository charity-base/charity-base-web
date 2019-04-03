import ApolloClient from 'apollo-boost'
import auth from '../../../lib/auth'
import { charityBaseGqlAuthUri } from '../../../lib/constants'

const authClient = new ApolloClient({
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

export default authClient
