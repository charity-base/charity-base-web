import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-jsx'
// TODO: Use the babel plugin:
// https://github.com/mAAdhaTTah/babel-plugin-prismjs

const CodeBlock = ({ language, codeString }) => {
  const el = useRef(null)

  useEffect(() => {
    Prism.highlightElement(el.current)
  }, [codeString, language])

  return (
    <pre><code ref={el} className={`language-${language}`}>{codeString.trim()}</code></pre>
  )
}

export default CodeBlock
