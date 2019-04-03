import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Icon, List, Skeleton, Typography } from 'antd'
import auth from '../../../lib/auth'
import authClient from '../../../lib/authApolloClient'
import { LIST_KEYS } from '../../../lib/gql'
import { LogIn } from '../../general/LogInOrOut'
import CreateKey from './CreateKey'
import DeleteKey from './DeleteKey'

const { Title, Paragraph } = Typography

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

const ApiKeys = () => {
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
ApiKeys.propTypes = {
}

export default ApiKeys
