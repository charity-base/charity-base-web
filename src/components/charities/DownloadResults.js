import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Modal } from 'antd'

class DownloadResults extends Component {
  state = {
    isModalOpen: false,
    isLoading: false,
    isUploaded: false,
    blob: null,
  }
  downloadResults = () => {
    this.setState({ isLoading: true, isModalOpen: true })

    fetch(`http://localhost:4000/api/v0.3.0/download-charities${this.props.queryString}`)
    .then(x => x.blob())
    .then(blob => {
      this.setState({ isLoading: false, isUploaded: true, blob })
    })
    .catch(x => console.log(x))
  }
  reset = () => {
    this.setState({
      isModalOpen: false,
      isLoading: false,
      isUploaded: false,
      blob: null,
    })
  }
  render() {
    return (
      <div>
        <Modal
          title="Download Results"
          visible={this.state.isModalOpen}
          onCancel={this.reset}
          footer={null}
          maskClosable={true}
        >
          {this.state.isUploaded && (<p>
            <a
              href={window.URL.createObjectURL(this.state.blob)}
              target="_blank"
              download="charity-base-download.txt"
              onClick={this.reset}
            >
              charity-base-download.txt ({this.state.blob.size} bytes)
            </a>
          </p>)}
          {this.state.isLoading && (
            <p>Creating file.  This could take a minute...</p>
          )}
        </Modal>
        <Button
          type="default"
          icon="download"
          loading={this.state.isLoading}
          onClick={this.downloadResults}
        >
          Download Results
        </Button>
      </div>
    )
  }
}
DownloadResults.propTypes = {
  queryString: PropTypes.string,
}

export { DownloadResults }
