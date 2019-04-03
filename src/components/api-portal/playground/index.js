import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { parse, print } from 'graphql'
import GraphiQL from 'graphiql'
import { Layout } from 'antd'
import defaultQuery from './defaultQuery'
import ApiKeyModal from './ApiKeyModal'
import { charityBaseApiUri } from '../../../lib/constants'
import auth from '../../../lib/auth'
import 'graphiql/graphiql.css'

const getGraphQLFetcher = apiKey => graphQLParams => {
  const { user } = auth
  return fetch(`${charityBaseApiUri}/graphql`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Apikey ${apiKey}`,
      'UserId': user ? user.sub : undefined,
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}


class Playground extends Component {
  state = {
    apiKey: '',
    isApiKeyModalOpen: true,
  }
  handlePrettifyQuery = event => {
    const editor = this.graphiqlComp.getQueryEditor()
    editor.setValue(print(parse(editor.getValue())))
  }
  handleToggleHistory = () => {
    this.graphiqlComp.setState(s => ({
      historyPaneOpen: !s.historyPaneOpen
    }))
  }
  render() {
    return (
      <div className='api-explorer-container'>
        <GraphiQL
          ref={c => { this.graphiqlComp = c }}
          fetcher={getGraphQLFetcher(this.state.apiKey)}
          defaultQuery={defaultQuery}
          >
          <GraphiQL.Toolbar>
            <GraphiQL.Button
              onClick={this.handlePrettifyQuery}
              title='Prettify Query (Shift-Ctrl-P)'
              label='Prettify'
            />
            <GraphiQL.Button
              onClick={this.handleToggleHistory}
              title='Show History'
              label='History'
            />
            <GraphiQL.Button
              onClick={() => this.setState({ isApiKeyModalOpen: true })}
              title='Set API Key'
              label='Set API Key'
            />
          </GraphiQL.Toolbar>
        </GraphiQL>
        <ApiKeyModal
          isOpen={this.state.isApiKeyModalOpen}
          onChange={apiKey => this.setState({ apiKey, isApiKeyModalOpen: false })}
          onClose={() => this.setState({ isApiKeyModalOpen: false })}
        />
      </div>
    )
  }
}
Playground.propTypes = {
}

export default Playground
