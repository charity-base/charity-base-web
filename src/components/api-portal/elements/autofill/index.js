import React from 'react'
import { Tabs } from 'antd'
import CodeBlock from '../../CodeBlock'
import CharityBaseForm from 'charity-base-form'
import { charityBaseApiKey, charityBaseGqlApiUri } from '../../../../lib/constants'

const { TabPane } = Tabs

const VERSION = '4.0.0-beta.7'

const cssString = `
#charity-base-autofill {
  /* Set the colour of the button and selected text fields */
  --mdc-theme-primary: #EC407A;
  /* Set the colour of selected checkboxes */
  --mdc-theme-secondary: #555;
}
`

const htmlString = `
<html>
  <head>
    <script src='https://unpkg.com/charity-base@${VERSION}'></script>
    <link href='https://unpkg.com/charity-base@${VERSION}/dist/index.css' rel='stylesheet'>
  </head>
  <body>
    <form>
      <section id='charity-base-autofill'></section>
      <!-- feel free to add more inputs here -->
    </form>
  </body>
</html>
`

const jsString = `
// Get your key from https://charitybase.uk/api-portal/keys
var apiKey = 'YOUR_API_KEY'
// Create a CharityBase client
var cb = CharityBase(apiKey)
// Create an instance of Elements
var elements = cb.elements()
// Create an instance of the autofill Element
var autofill = elements.createAutofill()
// Add an instance of the autofill Element into the \`charity-base-autofill\` <section>
autofill.mount('charity-base-autofill')
`

const Autofill = () => {
  return (
    <div>
      <Tabs
        className='multi-lang-code-block'
        animated={false}
      >
        <TabPane tab='Result' key='result'>
          <div style={{ padding: '0.5em', background: 'white' }}>
            <CharityBaseForm
              apiKey={charityBaseApiKey}
              apiUrl={charityBaseGqlApiUri}
              className='api-ref-autofill-demo'
            />
          </div>
        </TabPane>
        <TabPane tab='HTML' key='html'>
          <CodeBlock
            language='html'
            codeString={htmlString}
          />
        </TabPane>
        <TabPane tab='JavaScript' key='js'>
          <CodeBlock
            language='js'
            codeString={jsString}
          />
        </TabPane>
        <TabPane tab='CSS' key='css'>
          <CodeBlock
            language='css'
            codeString={cssString}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Autofill
