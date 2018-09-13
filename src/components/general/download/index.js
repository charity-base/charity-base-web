import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import numeral from 'numeral'
import { Modal, Button, Row, Col } from 'antd'
import Auth from '../../../lib/Auth'
import { apiEndpoint } from '../../../lib/constants'
import { fetchBlob } from '../../../lib/fetchHelpers'
import { defaultFieldsList } from '../../../lib/allowedFields'
import Selector from '../Selector'
import { FieldTree } from './FieldTree'

const auth = new Auth()

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
  componentDidMount() {
    auth.handleAuthentication(this.context.router.history)
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
      errorMessage: null,
    })

    const { fileType, checkedKeys: fieldPaths } = this.state

    const query = qs.parse(this.props.queryString)
    query.fields = fieldPaths.join(',')
    const queryString = qs.stringify(query)

    const url = `${apiEndpoint}/download-charities?${queryString}`

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
    }

    const body = JSON.stringify({ fileType })

    fetchBlob(url, { method: 'POST', headers, body })
    .then(blob => {
      if (!this.state.isLoading) return
      const fileExtension = fileType === 'JSON' ? 'jsonl' : 'csv'
      const fileName = `charity-base-${Math.round(new Date().getTime()/1000)}.${fileExtension}.gz`
      this.setState({ isLoading: false, isUploaded: true, fileName, blob })
    })
    .catch(x => {
      this.setState({
        isLoading: false,
        errorMessage: x.message || 'Oops, something went wrong',
      })
    })
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
          {this.state.errorMessage && <p style={{color: 'red'}}>{this.state.errorMessage}</p>}
          <Selector
            value={this.state.fileType}
            options={['CSV', 'JSON']}
            onChange={fileType => this.reset(false, fileType)}
          />
          <Button
            icon='download'
            style={{ width: 120 }}
            onClick={auth.ensureAuthenticated(this.context.router.history)(this.downloadResults)}
            loading={this.state.isLoading}
          >
            Download
          </Button>
          <Button
            id='loginBtn'
            onClick={() => auth.login(this.context.router.history)}
          >
            Log In
          </Button>
          <Button
            id='logoutBtn'
            onClick={() => auth.logout(this.context.router.history)}
          >
            Log Out
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
DownloadResults.contextTypes = {
  router: PropTypes.object,
}

export { DownloadResults }
