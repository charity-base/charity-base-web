import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Button } from 'antd'
import authClient from '../../../lib/authApolloClient'
import { DELETE_KEY, LIST_KEYS } from '../../../lib/gql'

// Todo: open a 'confirm delete?' modal on click

const DeleteKey = ({ disabled, id, onDelete }) => {
  return (
    <Mutation
      client={authClient}
      mutation={DELETE_KEY}
      variables={{ id }}
      update={(cache, { data: { apiKeys: { deleteKey } } }) => {
        const { apiKeys } = cache.readQuery({ query: LIST_KEYS })
        cache.writeQuery({
          query: LIST_KEYS,
          data: {
            apiKeys: {
              ...apiKeys,
              listKeys: apiKeys.listKeys.reduce((agg, x) => {
                return x.id === deleteKey.id ? agg : [...agg, x]
              }, []),
            }
          },
        })
        onDelete && onDelete(deleteKey.id)
      }}
    >
      {(triggerDelete, { loading }) => {
        return (
          <Button
            icon='delete'
            type='danger'
            shape='circle'
            disabled={disabled || loading}
            onClick={triggerDelete}
          />
        )
      }}
    </Mutation>
  )
}
DeleteKey.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
}

export default DeleteKey
