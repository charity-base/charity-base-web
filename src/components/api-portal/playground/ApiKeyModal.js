import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Typography, Select } from 'antd'
import authClient from '../../../lib/authApolloClient'
import { Query } from 'react-apollo'
import auth from '../../../lib/auth'
import { LIST_KEYS } from '../../../lib/gql'
import { LogIn } from '../../general/LogInOrOut'

const { Paragraph } = Typography
const { Option } = Select

const PromptLogIn = () => {
  return (
    <div>
      <Paragraph>
        Log In to play
      </Paragraph>
      <LogIn />
    </div>
  )
}

const ApiKeyModal = ({ currentKey, isOpen, onChange, onClose }) => {
  const [apiKey, setApiKey] = useState(currentKey)
  return (
    <Modal
      visible={isOpen}
      onCancel={() => {
        setApiKey(currentKey)
        onClose()
      }}
      footer={null}
      maskClosable={true}
    >
      <div style={{
        padding: '2em',
      }}>
        {auth.isAuthenticated() ? (
          <Query
            client={authClient}
            query={LIST_KEYS}
          >
            {({ loading, error, data }) => {
              if (error) return 'error oops'
              const keys = data && data.apiKeys ? data.apiKeys.listKeys : []
              if (keys.length === 0) {
                return (
                  <Paragraph>
                    Create an API key to get started
                  </Paragraph>
                )
              }
              return (
                <Fragment>
                  <Select
                    onChange={x => setApiKey(x)}
                    placeholder='Select an API key to use'
                    value={apiKey}
                    style={{
                      width: '100%',
                    }}
                    size='large'
                  >
                    {keys.map(x => (
                      <Option key={x.id} value={x.id}>{x.id}</Option>
                    ))}
                  </Select>
                  <Paragraph
                    code
                    style={{
                      margin: '1em 0',
                      visibility: apiKey ? 'visible' : 'hidden',
                    }}
                  >
                    Authorization: Apikey {apiKey}
                  </Paragraph>
                  <Button
                    type='primary'
                    icon='enter'
                    style={{ width: '100%' }}
                    onClick={() => onChange(apiKey)}
                    disabled={loading || !apiKey}
                  >
                    Set Authorization Header
                  </Button>
                </Fragment>
              )
            }}
          </Query>
        ) : (
          <PromptLogIn />
        )}
      </div>
    </Modal>
  )
}
ApiKeyModal.propTypes = {
  currentKey: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default ApiKeyModal
