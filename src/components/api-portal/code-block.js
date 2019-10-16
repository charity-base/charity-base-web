import React, { useEffect, useRef } from 'react'
import copy from 'copy-to-clipboard'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-jsx'
import Button from '../general/Button'
// TODO: Use the prism babel plugin:
// https://github.com/mAAdhaTTah/babel-plugin-prismjs

const CodeBlock = ({ language, codeString }) => {
  const el = useRef(null)

  useEffect(() => {
    Prism.highlightElement(el.current)
  }, [codeString, language])

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: '7px' }}>
        <Button
          ghost
          icon='copy'
          onClick={() => {copy(codeString.trim())}}
        >
          Copy
        </Button>
      </div>
      <pre><code ref={el} className={`language-${language}`}>{codeString.trim()}</code></pre>
    </div>
  )
}

export default CodeBlock
