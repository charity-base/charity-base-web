import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Typography, Select } from 'antd'
import authClient from '../../../lib/authApolloClient'
import { Query } from 'react-apollo'
import auth from '../../../lib/auth'
import { LIST_KEYS } from '../../../lib/gql'
import { LogIn } from '../../general/LogInOrOut'
import CreateKey from '../api-keys/CreateKey'

const { Title, Paragraph } = Typography
const { Option } = Select

const PromptLogIn = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={4}>
        Log In To Play
      </Title>
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
              return (
                <Fragment>
                  {keys.length === 0 ? (
                    <CreateKey disabled={loading} />
                  ) : null}
                  <Select
                    notFoundContent='No API Keys Found'
                    onChange={x => setApiKey(x)}
                    placeholder='Select an API key'
                    size='large'
                    style={{
                      margin: '1em 0',
                      width: '100%',
                    }}
                    value={apiKey}
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
