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
    fileType: null,
    blob: null,
  }
  downloadResults = fileType => {
    this.setState({ isLoading: true, isModalOpen: true, fileType })

    const url = `${apiEndpoint}/download-charities${this.props.queryString}`

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    }

    const body = JSON.stringify({ fileType })

    fetch(url, { method: 'POST', headers, body })
    .then(x => x.blob())
    .then(blob => {
      const fileExtension = fileType === 'JSON' ? 'jsonl' : 'csv'
      const fileName = `charity-base-${Math.round(new Date().getTime()/1000)}.${fileExtension}.gz`
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
          title={`${this.state.fileType} Download`}
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
          {this.state.fileType === 'CSV' && (
            <p style={{ marginTop: '10px' }}>
              <b>Note:</b> this CSV only offers 3% of the available fields for each charity.
              For the full database please use JSON instead.
              If there are any fields you'd particularly like in CSV format, email dan@charitybase.uk
            </p>
          )}
        </Modal>
        {this.props.linkText ? (
          <a onClick={x => this.downloadResults(this.props.fileType || 'JSON')}>{this.props.linkText}</a>
        ) : (
          <span>
            {this.props.fileType !== 'CSV' && <Button icon='download' style={{ width: '100%' }} onClick={x => this.downloadResults('JSON')}>
              Download JSON
            </Button>}
            {this.props.fileType !== 'JSON' && <Button icon='download' style={{ width: '100%', marginTop: '5px' }} onClick={x => this.downloadResults('CSV')}>
              Download CSV
            </Button>}
          </span>
        )}
      </span>
    )
  }
}
DownloadResults.propTypes = {
  queryString: PropTypes.string,
  linkText: PropTypes.string,
  fileType: PropTypes.string,
}

export { DownloadResults }
