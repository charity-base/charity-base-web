import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import auth from '../../lib/auth'
import { LIST_KEYS, CREATE_KEY, DELETE_KEY } from '../../lib/gql'
import { Icon, Button, List, Skeleton, Typography } from 'antd'
import { LogIn } from '../general/LogInOrOut'

const { Title, Paragraph } = Typography

const MAX_KEYS = 3

const CreateKey = ({ disabled }) => {
  return (
    <Mutation
      mutation={CREATE_KEY}
      update={(cache, { data: { apiKeys: { create } } }) => {
        const { apiKeys } = cache.readQuery({ query: LIST_KEYS })
        cache.writeQuery({
          query: LIST_KEYS,
          data: {
            apiKeys: {
              ...apiKeys,
              list: [
                ...apiKeys.list,
                create,
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

const DeleteKey = ({ disabled, id }) => {
  return (
    <Mutation
      mutation={DELETE_KEY}
      variables={{ id }}
      update={(cache, { data }) => {
        const { apiKeys } = cache.readQuery({ query: LIST_KEYS })
        cache.writeQuery({
          query: LIST_KEYS,
          data: {
            apiKeys: {
              ...apiKeys,
              list: apiKeys.list.reduce((agg, x) => {
                return x.id === data.apiKeys.delete.id ? agg : [...agg, x]
              }, []),
            }
          },
        })
      }}
    >
      {(onDelete, { loading }) => {
        return (
          <Button
            icon='delete'
            type='danger'
            shape='circle'
            disabled={disabled || loading}
            onClick={onDelete}
          />
        )
      }}
    </Mutation>
  )
}
DeleteKey.propTypes = {
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
}

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

const ApiKeys = () => {
  if (!auth.isAuthenticated()) {
    return <PromptLogIn />
  }
  return (
    <Query
      query={LIST_KEYS}
    >
      {({ loading, error, data }) => {
        if (error) return 'error oops'
        const keys = data && data.apiKeys ? data.apiKeys.list : []
        return (
          <Fragment>
            <ApiKeysTitle />
            <List
              bordered
              loading={loading}
              itemLayout="horizontal"
              dataSource={keys}
              footer={<CreateKey disabled={loading || keys.length >= MAX_KEYS} />}
              locale={{ emptyText: 'No registered API keys' }}
              renderItem={x => (
                <List.Item
                  actions={[
                    <DeleteKey
                      id={x.id}
                      disabled={loading}
                    />
                  ]}
                >
                  <Skeleton
                    title={true}
                    paragraph={false}
                    loading={loading}
                    active={loading}
                  >
                    <List.Item.Meta
                      title={<Paragraph copyable>{x.id}</Paragraph>}
                      style={{ marginTop: '14px' }}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Fragment>
        )
      }}
    </Query>
  )
}

export default ApiKeys
