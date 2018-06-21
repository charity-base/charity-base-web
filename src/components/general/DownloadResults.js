import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { apiEndpoint } from '../../lib/constants'
import { Modal, Button, Row, Col } from 'antd'

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
      <span>
        <Modal
          title="Download Results"
          visible={this.state.isModalOpen}
          onCancel={this.reset}
          footer={null}
          maskClosable={true}
        >
          {this.state.isUploaded && (
            <Row>
              <Col span={12}>
                <a
                  href={window.URL.createObjectURL(this.state.blob)}
                  target="_blank"
                  download={this.state.fileName}
                  onClick={this.reset}
                >
                  {this.state.fileName}
                </a>
              </Col>
              <Col span={12}>
                ({numeral(this.state.blob.size).format('0b')})
              </Col>
            </Row>
          )}
          {this.state.isLoading && (
            <p>Creating file.  This could take a minute...</p>
          )}
        </Modal>
        {this.props.linkText ? (
          <a onClick={this.downloadResults}>{this.props.linkText}</a>
        ) : (
          <Button icon='download' style={{ width: '100%' }} onClick={this.downloadResults}>
            Download JSON
          </Button>
        )}
      </span>
    )
  }
}
DownloadResults.propTypes = {
  queryString: PropTypes.string,
  linkText: PropTypes.string,
}

export { DownloadResults }
