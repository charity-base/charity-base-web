import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import auth from '../../../lib/auth'
import authClient from '../../../lib/authApolloClient'
import { LIST_KEYS } from '../../../lib/gql'
import { LogIn } from '../../general/LogInOrOut'
import CreateKey from './CreateKey'
import KeysTable from './KeysTable'

const MAX_KEYS = 3

const ApiKeys = ({ setPlaygroundKey }) => {
  return auth.isAuthenticated() ? (
    <Query
      client={authClient}
      query={LIST_KEYS}
    >
      {({ loading, error, data }) => {
        if (error) return 'error oops' + error
        const keys = data && data.apiKeys ? data.apiKeys.listKeys : []
        return (
          <KeysTable
            keys={keys}
            loading={loading}
            footer={() => (
              <CreateKey
                disabled={loading || keys.length >= MAX_KEYS}
              />
            )}
            emptyText='No API keys found'
            onDelete={() => setPlaygroundKey(undefined)}
          />
        )
      }}
    </Query>
  ) : (
    <KeysTable
      emptyText='Log In to manage your API keys'
      footer={() => (
        <LogIn />
      )}
      onDelete={() => setPlaygroundKey(undefined)}
    />
  )
}
ApiKeys.propTypes = {
  setPlaygroundKey: PropTypes.func.isRequired,
}

export default ApiKeys
