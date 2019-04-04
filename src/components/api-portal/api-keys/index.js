import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Table, Tag, Typography } from 'antd'
import auth from '../../../lib/auth'
import authClient from '../../../lib/authApolloClient'
import { LIST_KEYS } from '../../../lib/gql'
import { LogIn } from '../../general/LogInOrOut'
import CreateKey from './CreateKey'
import DeleteKey from './DeleteKey'

const MAX_KEYS = 3

const { Column } = Table
const { Text } = Typography

const KeysTable = ({ keys, loading, footer, emptyText, onDelete }) => {
  return (
    <Table
      dataSource={keys}
      footer={footer}
      loading={loading}
      locale={{ emptyText }}
      pagination={false}
      rowKey='id'
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
            onDelete={onDelete}
          />
        )}
      />
    </Table>
  )
}
KeysTable.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    createdAt: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  footer: PropTypes.func.isRequired,
  emptyText: PropTypes.string.isRequired,
}
KeysTable.defaultProps = {
  keys: [],
  loading: false,
  onDelete: () => {},
}

const ApiKeys = ({ setPlaygroundKey }) => {
  if (!auth.isAuthenticated()) {
    return (
      <KeysTable
        emptyText='Log In to manage your API keys'
        footer={() => (
          <LogIn />
        )}
        onDelete={() => setPlaygroundKey(undefined)}
      />
    )
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
  )
}
ApiKeys.propTypes = {
  setPlaygroundKey: PropTypes.func.isRequired,
}

export default ApiKeys
