import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Button } from 'antd'
import authClient from '../../../lib/authApolloClient'
import { CREATE_KEY, LIST_KEYS } from '../../../lib/gql'

const CreateKey = ({ disabled }) => {
  return (
    <Mutation
      client={authClient}
      mutation={CREATE_KEY}
      update={(cache, { data: { apiKeys: { createKey } } }) => {
        const { apiKeys } = cache.readQuery({ query: LIST_KEYS })
        cache.writeQuery({
          query: LIST_KEYS,
          data: {
            apiKeys: {
              ...apiKeys,
              listKeys: [
                ...apiKeys.listKeys,
                createKey,
              ],
            }
          },
        })
      }}
    >
      {(onCreate, { loading }) => {
        return (
          <Button
            icon='plus'
            type='primary'
            size='large'
            block
            onClick={onCreate}
            disabled={disabled || loading}
          >
            Create API Key
          </Button>
        )
      }}
    </Mutation>
  )
}
CreateKey.propTypes = {
  disabled: PropTypes.bool.isRequired,
}

export default CreateKey
