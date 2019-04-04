import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import { Alert, Button, Input, Modal } from 'antd'
import authClient from '../../../lib/authApolloClient'
import { DELETE_KEY, LIST_KEYS } from '../../../lib/gql'

const DeleteKey = ({ disabled, id, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
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
          <Fragment>
            <Button
              icon='delete'
              type='danger'
              shape='circle'
              disabled={disabled || loading}
              onClick={() => setIsOpen(true)}
            />
            <Modal
              visible={isOpen && !disabled}
              onCancel={() => {
                setInputValue('')
                setIsOpen(false)
              }}
              maskClosable={true}
              footer={[
                <Button
                  disabled={inputValue !== id}
                  key='delete'
                  icon='delete'
                  type='danger'
                  loading={loading}
                  onClick={triggerDelete}
                >
                  Delete
                </Button>
              ]}
            >
              <div
                style={{ margin: '2em 0' }}
              >
                <Alert
                  message='This process is irreversible and any applications using the key will break.'
                  type='warning'
                />
              </div>
              <Input
                value={inputValue}
                placeholder='Confirm API key to delete'
                onChange={e => setInputValue(e.target.value)}
              />
            </Modal>
          </Fragment>
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
