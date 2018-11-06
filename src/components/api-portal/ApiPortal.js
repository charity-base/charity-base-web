import React, { Component } from 'react'
import PropTypes from 'prop-types'
import charityBase from '../../lib/charityBaseClient'
import { Layout, Icon, Button, List, Skeleton, Tooltip, Menu, message } from 'antd'
import TextButton from '../general/TextButton'
import { Page, ScrollableContent, ResponsiveSider } from '../general/Layout'
import { CopyToClipboard } from 'react-copy-to-clipboard'


class ApiPortal extends Component {
  state = {
    apiKeys: [],
    showKeys: false,
    isLoading: false,
  }
  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.getApiKey()
    }
  }
  getApiKey = () => {
    charityBase.apiKey.get({
      accessToken: localStorage.getItem('access_token'),
    })
    .then(({ apiKeys }) => {
      this.setState({ apiKeys })
    })
    .catch(e => {
      message.error(e.message || 'Oops, something went wrong')
    })
  }
  refreshApiKey = () => {
    charityBase.apiKey.create({
      accessToken: localStorage.getItem('access_token'),
    })
    .then(({ apiKeys }) => {
      this.setState({ apiKeys })
    })
    .catch(e => {
      message.error(e.message || 'Oops, something went wrong')
    })
  }
  removeApiKey = x => {
    charityBase.apiKey.remove({
      accessToken: localStorage.getItem('access_token'),
      removeApiKey: x,
    })
    .then(({ apiKeys }) => {
      this.setState({ apiKeys })
    })
    .catch(e => {
      message.error(e.message || 'Oops, something went wrong')
    })
  }
  onCopy = () => {
    message.success('Copied API key to clipboard')
  }
  toggleState = checked => {
    if (!checked) {
      return this.setState({ showKeys: false })
    }
    this.setState({ showKeys: true })
    this.getApiKey()
  }
  render() {
    const { isMobile } = this.props
    return (
      <Page isMobile={isMobile}>
        <ResponsiveSider isMobile={isMobile}>
          <Menu
            onClick={() => {}}
            selectedKeys={null}
            mode="vertical"
          >
            <Menu.Item key="charity-base-docs-link">
              <a href="https://charity-base.github.io/charity-base-docs" target="_blank" rel="noopener noreferrer">
                <Icon type='link' />
                API Documentation
              </a>
            </Menu.Item>
          </Menu>
        </ResponsiveSider>
        <Layout.Content style={{ position: 'relative', backgroundColor: '#FFF' }}>
          <ScrollableContent paddingTop={0}>
            <h1><Icon type='api' theme='filled' /> API</h1>
            <h2>
              <Icon type='key' />
              <span style={{ paddingLeft: 5, paddingRight: 5 }}>API Keys</span>
              <TextButton
                style={{ fontSize: 12 }}
                onClick={() => this.toggleState(!this.state.showKeys)}
              >
                {this.state.showKeys ? 'hide' : 'show'}
              </TextButton>
            </h2>
            <List
              bordered
              loading={this.state.isLoading}
              itemLayout="horizontal"
              dataSource={this.state.apiKeys}
              footer={
                <Button
                  icon='plus'
                  type='primary'
                  size='large'
                  block
                  onClick={this.refreshApiKey}
                  disabled={this.state.isLoading || !this.state.showKeys || this.state.apiKeys.length === 3}
                >
                  Create API Key
                </Button>
              }
              locale={{ emptyText: 'No registered API keys' }}
              renderItem={x => (
                <List.Item
                  actions={[
                    <Tooltip
                      title='Copy Key'
                    >
                      <CopyToClipboard
                        text={x.value}
                        onCopy={this.onCopy}
                      >
                        <Button
                          icon='copy'
                          shape='circle'
                          disabled={this.state.isLoading || !this.state.showKeys}
                        />
                      </CopyToClipboard>
                    </Tooltip>,
                    <Tooltip
                      title='Delete Key'
                    >
                      <Button
                        icon='delete'
                        type='danger'
                        shape='circle'
                        disabled={this.state.isLoading || !this.state.showKeys}
                        onClick={() => this.removeApiKey(x.value)}
                      />
                    </Tooltip>
                  ]}
                >
                  <Skeleton
                    title={true}
                    paragraph={false}
                    loading={this.state.isLoading || !this.state.showKeys}
                    active={this.state.isLoading}
                  >
                    <List.Item.Meta
                      title={x.value}
                      style={{ marginTop: '14px' }}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </ScrollableContent>
        </Layout.Content>
      </Page>
    )
  }
}
ApiPortal.propTypes = {
  isMobile: PropTypes.bool,
}

export { ApiPortal }
