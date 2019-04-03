import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { parse, print } from 'graphql'
import GraphiQL from 'graphiql'
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
      'Authorization': apiKey ? `Apikey ${apiKey}` : undefined,
      'UserId': user ? user.sub : undefined,
    },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json())
}


class Playground extends Component {
  state = {
    isApiKeyModalOpen: this.props.apiKey ? false : true,
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
    const { apiKey, setApiKey } = this.props
    return (
      <div className='api-explorer-container'>
        <GraphiQL
          ref={c => { this.graphiqlComp = c }}
          fetcher={getGraphQLFetcher(apiKey)}
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
              title='Select API Key'
              label='Select API Key'
            />
          </GraphiQL.Toolbar>
        </GraphiQL>
        <ApiKeyModal
          currentKey={apiKey}
          isOpen={this.state.isApiKeyModalOpen}
          onChange={apiKey => {
            setApiKey(apiKey)
            this.setState({ isApiKeyModalOpen: false })
          }}
          onClose={() => this.setState({ isApiKeyModalOpen: false })}
        />
      </div>
    )
  }
}
Playground.propTypes = {
  apiKey: PropTypes.string,
  setApiKey: PropTypes.func.isRequired,
}

export default Playground
