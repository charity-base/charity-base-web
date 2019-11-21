import React from 'react'
import { Tabs } from 'antd'
import CodeBlock from '../CodeBlock'

const { TabPane } = Tabs

const bashString = `
# Using GET:
curl \\
  -H "Authorization: Apikey YOUR_API_KEY" \\
  "https://charitybase.uk/api/graphql?query=\\{CHC\\{getCharities(filters:\\{\\})\\{count\\}\\}\\}"

# Or using POST:
curl \\
  -X POST \\
  -H "Authorization: Apikey YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "query": "{ CHC { getCharities(filters: {}) { count } } }" }' \\
  https://charitybase.uk/api/graphql
`

const jsString = `
// yarn add isomorphic-unfetch (optional)
// import fetch from 'isomorphic-unfetch' (to work on server & client)

const QUERY = \`
  {
    CHC {
      getCharities(filters: {}) {
        count
      }
    }
  }
\`

// Using GET:
const URL = \`https://charitybase.uk/api/graphql?query=\$\{QUERY\}\`
const OPTS = {
  headers: {
    Authorization: 'Apikey YOUR_API_KEY'
  }
}

// Or using POST:
const URL = 'https://charitybase.uk/api/graphql'
const OPTS = {
  method: 'POST',
  headers: {
    Authorization: 'Apikey YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query: QUERY })
}

fetch(URL, OPTS)
  .then(res => res.json())
  .catch(() => {
    // probably a network error
  })
  .then(({ data, errors }) => {
    if (errors) {
      return console.log('ERRORS: ', errors)
    }
    console.log(data)
    // { CHC: { getCharities: { count: 168438 } } }
  })
`

const jsxString = `
// yarn add apollo-boost @apollo/react-hooks graphql
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'https://charitybase.uk/api/graphql',
  headers: {
    Authorization: 'Apikey YOUR_API_KEY',
  }
})

const QUERY = gql\`
  {
    CHC {
      getCharities(filters: {}) {
        count
      }
    }
  }
\`

const CharitiesCount = () => {
  const { loading, error, data } = useQuery(QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <p>Successfully counted {data.CHC.getCharities.count} charities</p>
  )
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>CharityBase Demo 🚀</h1>
      <CharitiesCount />
    </ApolloProvider>
  )
}
`

const Example1 = () => {
  return (
    <div>
      <Tabs
        className='multi-lang-code-block'
        animated={false}
        defaultActiveKey='bash'
      >
        <TabPane tab='Bash' key='bash'>
          <CodeBlock
            language='bash'
            codeString={bashString}
          />
        </TabPane>
        <TabPane tab='JavaScript' key='js'>
          <CodeBlock
            language='js'
            codeString={jsString}
          />
        </TabPane>
        <TabPane tab='React' key='jsx'>
          <CodeBlock
            language='jsx'
            codeString={jsxString}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Example1