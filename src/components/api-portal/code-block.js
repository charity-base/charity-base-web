import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-jsx'
// TODO: Use the babel plugin:
// https://github.com/mAAdhaTTah/babel-plugin-prismjs

const CodeBlock = ({ language, codeString }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [codeString, language])

  return (
    <pre><code className={`language-${language}`}>{codeString.trim()}</code></pre>
  )
}

export default CodeBlock
