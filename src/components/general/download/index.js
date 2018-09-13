import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import numeral from 'numeral'
import { Modal, Button, Row, Col } from 'antd'
import { apiEndpoint } from '../../../lib/constants'
import { defaultFieldsList } from '../../../lib/allowedFields'
import Selector from '../Selector'
import { FieldTree } from './FieldTree'


class DownloadResults extends Component {
  state = {
    isModalOpen: false,
    isLoading: false,
    isUploaded: false,
    fileName: null,
    fileType: this.props.fileType || 'CSV',
    blob: null,
    checkedKeys: defaultFieldsList,
  }
  onCheck = checkedKeys => {
    this.setState({ checkedKeys })
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  downloadResults = () => {
    this.setState({
      isLoading: true,
      isUploaded: false,
      fileName: null,
      blob: null,
    })

    const { fileType, checkedKeys: fieldPaths } = this.state

    const query = qs.parse(this.props.queryString)
    query.fields = fieldPaths.join(',')
    const queryString = qs.stringify(query)

    const url = `${apiEndpoint}/download-charities?${queryString}`

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    }

    const body = JSON.stringify({ fileType })

    fetch(url, { method: 'POST', headers, body })
    .then(x => x.blob())
    .then(blob => {
      if (!this.state.isLoading) return
      const fileExtension = fileType === 'JSON' ? 'jsonl' : 'csv'
      const fileName = `charity-base-${Math.round(new Date().getTime()/1000)}.${fileExtension}.gz`
      this.setState({ isLoading: false, isUploaded: true, fileName, blob })
    })
    .catch(x => console.log(x))
  }
  reset = (closeModal, fileType) => {
    this.setState({
      isModalOpen: !closeModal,
      isLoading: false,
      isUploaded: false,
      fileName: null,
      fileType: fileType || 'CSV',
      blob: null,
    })
  }
  render() {
    return (
      <span>
        <Modal
          title={`Data Download`}
          visible={this.state.isModalOpen}
          onCancel={() => this.reset(true)}
          footer={null}
          maskClosable={true}
        >
          <Selector
            value={this.state.fileType}
            options={['CSV', 'JSON']}
            onChange={fileType => this.reset(false, fileType)}
          />
          <Button
            icon='download'
            style={{ width: 120 }}
            onClick={this.downloadResults}
            loading={this.state.isLoading}
          >
            Download
          </Button>
          {this.state.isUploaded && (
            <Row>
              <Col span={12}>
                <a
                  href={window.URL.createObjectURL(this.state.blob)}
                  target="_blank"
                  download={this.state.fileName}
                  onClick={() => this.reset(true)}
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
            <p>Creating file.  This could take a couple of minutes...</p>
          )}
          {this.state.fileType === 'CSV' && (
            <p style={{ marginTop: '10px' }}>
              <b>Note:</b> this CSV only offers 3% of the available fields for each charity.
              For the full database please use JSON instead.
              If there are any fields you'd particularly like in CSV format, email dan@charitybase.uk
            </p>
          )}
          <FieldTree
            checkedKeys={this.state.checkedKeys}
            onCheck={this.onCheck}
          />
        </Modal>
        {this.props.linkText ? (
          <a onClick={this.openModal}>
            {this.props.linkText}
          </a>
        ) : (
          <Button icon='download' style={{ width: '100%' }} onClick={this.openModal}>
            CSV / JSON
          </Button>
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
