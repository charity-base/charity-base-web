import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { apiEndpoint } from '../../lib/constants'
import { Modal, Button } from 'antd'

class DownloadResults extends Component {
  state = {
    isModalOpen: false,
    isLoading: false,
    isUploaded: false,
    fileName: null,
    blob: null,
  }
  downloadResults = () => {
    this.setState({ isLoading: true, isModalOpen: true })

    fetch(`${apiEndpoint}/download-charities${this.props.queryString}`)
    .then(x => x.blob())
    .then(blob => {
      const fileName = `charity-base-${Math.round(new Date().getTime()/1000)}.jsonl.gz`
      this.setState({ isLoading: false, isUploaded: true, fileName, blob })
    })
    .catch(x => console.log(x))
  }
  reset = () => {
    this.setState({
      isModalOpen: false,
      isLoading: false,
      isUploaded: false,
      fileName: null,
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
              download={this.state.fileName}
              onClick={this.reset}
            >
              {this.state.fileName}
            </a>
            ({numeral(this.state.blob.size).format('0b')})
          </p>)}
          {this.state.isLoading && (
            <p>Creating file.  This could take a minute...</p>
          )}
        </Modal>
        <Button icon='download' style={{ width: '100%' }} onClick={this.downloadResults}>
          Download JSON
        </Button>
      </div>
    )
  }
}
DownloadResults.propTypes = {
  queryString: PropTypes.string,
}

export { DownloadResults }
