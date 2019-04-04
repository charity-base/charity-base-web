import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Icon, Table, Tag, Typography } from 'antd'
import auth from '../../../lib/auth'
import authClient from '../../../lib/authApolloClient'
import { LIST_KEYS } from '../../../lib/gql'
import { LogIn } from '../../general/LogInOrOut'
import CreateKey from './CreateKey'
import DeleteKey from './DeleteKey'

const { Column } = Table
const { Title, Text, Paragraph } = Typography

const MAX_KEYS = 3

const ApiKeysTitle = () => {
  return (
    <Title level={2}>
      <Icon type='key' style={{ marginRight: '0.5em' }} />
      <span>API Keys</span>
    </Title>
  )
}

const PromptLogIn = () => {
  return (
    <div>
      <ApiKeysTitle />
      <Paragraph>
        Log In to manage your API keys
      </Paragraph>
      <LogIn />
    </div>
  )
}

const ApiKeys = ({ setPlaygroundKey }) => {
  if (!auth.isAuthenticated()) {
    return <PromptLogIn />
  }
  return (
    <Query
      client={authClient}
      query={LIST_KEYS}
    >
      {({ loading, error, data }) => {
        if (error) return 'error oops'
        const keys = data && data.apiKeys ? data.apiKeys.listKeys : []
        return (
          <Fragment>
            <Table
              dataSource={keys}
              footer={() => (
                <CreateKey
                  disabled={loading || keys.length >= MAX_KEYS}
                />
              )}
              loading={loading}
              locale={{ emptyText: 'No API keys found' }}
              pagination={false}
            >
              <Column
                title='API Key'
                dataIndex='id'
                key='id'
                render={(apiKey) => (
                  <Text copyable>{apiKey}</Text>
                )}
              />
              <Column
                title='Permissions'
                dataIndex='roles'
                key='roles'
                render={(roles) => (
                  <span>
                    {roles.map(role => <Tag color='blue' key={role}>{role}</Tag>)}
                  </span>
                )}
              />
              <Column
                dataIndex='createdAt'
                key='createdAt'
                sortDirections={['ascend']}
                sorter={(a, b) => (new Date(a.createdAt) - new Date(b.createdAt))}
                sortOrder='ascend'
                title='Created (GMT)'
              />
              <Column
                title='Delete'
                key='delete'
                render={(_, record) => (
                  <DeleteKey
                    id={record.id}
                    disabled={loading}
                    onDelete={() => setPlaygroundKey(undefined)}
                  />
                )}
              />
            </Table>
          </Fragment>
        )
      }}
    </Query>
  )
}
ApiKeys.propTypes = {
  setPlaygroundKey: PropTypes.func.isRequired,
}

export default ApiKeys
