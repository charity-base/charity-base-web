import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Typography } from 'antd'
import DeleteKey from './DeleteKey'

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

export default KeysTable
