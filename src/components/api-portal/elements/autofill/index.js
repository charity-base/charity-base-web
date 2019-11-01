import React from 'react'
import { Tabs } from 'antd'
import CodeBlock from '../../code-block'

const { TabPane } = Tabs

const cssString = `
body {
  font-family: sans-serif;
  --mdc-theme-primary: green;
}
`

const htmlString = `
<html>
  <head>
    <script src='https://unpkg.com/charity-base-widgets@0.5.0/dist/index.js'></script>
    <link href='https://unpkg.com/charity-base-widgets@0.5.0/dist/index.css' rel='stylesheet'>
  </head>
  <body>
    <form>
      <div id='charity-base-autofill'></div>
      <!-- feel free to add more inputs here -->
    </form>
  </body>
</html>
`

const jsString = `
var apiKey = 'YOUR_API_KEY' // replace this with your actual key
var cb = CharityBase(apiKey)
var autofill = cb.createAutofill()
cb.render(autofill, 'charity-base-autofill')
`

const Autofill = () => {
  return (
    <div>
      <Tabs
        className='multi-lang-code-block'
        animated={false}
      >
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
