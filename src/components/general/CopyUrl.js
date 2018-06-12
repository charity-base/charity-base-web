import React, { Component } from 'react'
import { Button, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class CopyUrl extends Component {
  onCopy = () => {
    message.success('copied to clipboard')
  }
  render() {
    return (
      <CopyToClipboard
        text={window.location.href}
        onCopy={this.onCopy}
      >
        <Button icon='share-alt'>
          Copy URL
        </Button>
      </CopyToClipboard>
    )
  }
}

export { CopyUrl }
