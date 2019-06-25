import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import numeral from 'numeral'
import { Modal, Button, Alert } from 'antd'
import auth from '../../../lib/auth'
import { defaultFieldsList } from '../../../lib/allowedFields'
import charityBase from '../../../lib/charityBaseClient'
import Selector from '../Selector'
import { FieldTree } from './FieldTree'
import TextButton from '../TextButton'

// class DownloadResults extends Component {
//   state = {
//     openedManually: false,
//     isLoading: false,
//     isUploaded: false,
//     fileName: null,
//     fileType: this.props.fileType || 'CSV',
//     blob: null,
//     checkedKeys: defaultFieldsList,
//   }
//   onCheck = checkedKeys => {
//     this.setState({ checkedKeys })
//   }
//   toggleModal = open => {
//     const { history } = this.context.router
//     const newSearch = qs.stringify({
//       ...qs.parse(history.location.search),
//       download: open ? true : undefined,
//     })
//     if (open) {
//       this.setState({ openedManually: true })
//     }
//     if (open || !this.state.openedManually) {
//       return history.push({ search: newSearch })
//     }
//     history.goBack()
//   }
//   downloadResults = () => {
//     this.setState({
//       isLoading: true,
//       isUploaded: false,
//       fileName: null,
//       blob: null,
//       errorMessage: null,
//     })

//     const { fileType, checkedKeys: fieldPaths } = this.state

//     const query = qs.parse(this.props.queryString)

//     charityBase.charity.download({
//       ...query,
//       accessToken: localStorage.getItem('access_token'),
//       fields: fieldPaths,
//       fileType,
//     })
//     .then(blob => {
//       if (!this.state.isLoading) return
//       const fileExtension = fileType === 'JSON' ? 'jsonl' : 'csv'
//       const fileName = `charity-base-${Math.round(new Date().getTime()/1000)}.${fileExtension}.gz`
//       this.setState({ isLoading: false, isUploaded: true, fileName, blob })
//     })
//     .catch(x => {
//       this.setState({
//         isLoading: false,
//         errorMessage: x.message || 'Oops, something went wrong',
//       })
//     })
//   }
//   reset = (closeModal, fileType) => {
//     this.setState({
//       isLoading: false,
//       isUploaded: false,
//       fileName: null,
//       fileType: fileType || 'CSV',
//       blob: null,
//     })
//     if (closeModal) {
//       this.toggleModal(false)
//     }
//   }
//   render() {
//     const isModalOpen = qs.parse(this.context.router.history.location.search).download === 'true'
//     const isAuthenticated = auth.isAuthenticated()
//     const { isLoading, fileType } = this.state
//     return (
//       <span>
//         <Modal
//           title={`Data Download`}
//           visible={isModalOpen}
//           onCancel={() => this.reset(true)}
//           footer={null}
//           maskClosable={true}
//         >
//           {!isAuthenticated && (
//             <Alert
//               description={
//                 <span>
//                   Please <TextButton onClick={() => auth.login(this.context.router.history)}>Log In</TextButton> before continuing.
//                 </span>
//               }
//               type='info'
//               style={{ marginBottom: '10px' }}
//             />
//           )}
//           {this.state.errorMessage && <Alert
//             message='Oops, something went wrong'
//             description='Please wait a minute before trying again.'
//             type='error'
//             style={{ marginBottom: '10px' }}
//           />}
//           <Selector
//             value={fileType}
//             options={['CSV', 'JSON']}
//             onChange={fType => this.reset(false, fType)}
//           />
//           <Button
//             icon='download'
//             style={{ width: 120 }}
//             onClick={auth.wrapAuthentication(this.context.router.history)(this.downloadResults)}
//             loading={isLoading}
//             disabled={!isAuthenticated}
//           >
//             Download
//           </Button>
//           {this.state.isUploaded && (
//             <Alert
//               style={{ margin: '10px 0 10px 0' }}
//               type='success'
//               message={
//                 <span>
//                   <a
//                     href={window.URL.createObjectURL(this.state.blob)}
//                     target='_blank'
//                     rel='noopener noreferrer'
//                     download={this.state.fileName}
//                     onClick={() => this.reset(true)}
//                     style={{ marginRight: '10px' }}
//                   >
//                     {this.state.fileName}
//                   </a>
//                   [{numeral(this.state.blob.size).format('0b')}]
//                 </span>
//               }
//             />
//           )}
//           {isLoading && (
//             <Alert
//               style={{ margin: '10px 0 10px 0' }}
//               type='info'
//               message='Creating file.  This could take a couple of minutes...'
//             />
//           )}
//           {isAuthenticated && fileType === 'CSV' && (
//             <Alert
//               style={{ margin: '10px 0 10px 0' }}
//               type='info'
//               message={
//                 <div>
//                   <b>Note:</b> this CSV only offers a subset of the available fields for each charity.
//                   For the full database please use JSON instead.
//                   If there are any fields you'd particularly like in CSV format, email <b>support@charitybase.uk</b>
//                 </div>
//               }
//             />
//           )}
//           {isAuthenticated && (
//             <Alert
//               style={{ margin: '10px 0 10px 0' }}
//               type='info'
//               message="Choose fields below before downloading."
//             />
//           )}
//           <div style={{ maxHeight: '300px', overflowY: 'scroll', border: '1px solid #DDD', borderRadius: '3px' }}>
//             <FieldTree
//               checkedKeys={this.state.checkedKeys}
//               onCheck={this.onCheck}
//               disabled={!isAuthenticated || isLoading}
//             />
//           </div>
//         </Modal>
//         {this.props.linkText ? (
//           <TextButton onClick={() => this.toggleModal(true)}>
//             {this.props.linkText}
//           </TextButton>
//         ) : (
//           <Button icon='download' style={{ width: '100%' }} onClick={() => this.toggleModal(true)}>
//             CSV / JSON
//           </Button>
//         )}
//       </span>
//     )
//   }
// }
// DownloadResults.propTypes = {
//   queryString: PropTypes.string,
//   linkText: PropTypes.string,
//   fileType: PropTypes.string,
// }
// DownloadResults.contextTypes = {
//   router: PropTypes.object,
// }


class DownloadResults extends Component {
  state = {
    openedManually: false,
    isLoading: false,
    isUploaded: false,
    fileName: null,
    fileType: this.props.fileType || 'CSV',
    blob: null,
    checkedKeys: defaultFieldsList,
  }
  toggleModal = open => {
    const { history } = this.context.router
    const newSearch = qs.stringify({
      ...qs.parse(history.location.search),
      download: open ? true : undefined,
    })
    if (open) {
      this.setState({ openedManually: true })
    }
    if (open || !this.state.openedManually) {
      return history.push({ search: newSearch })
    }
    history.goBack()
  }
  reset = (closeModal, fileType) => {
    this.setState({
      isLoading: false,
      isUploaded: false,
      fileName: null,
      fileType: fileType || 'CSV',
      blob: null,
    })
    if (closeModal) {
      this.toggleModal(false)
    }
  }
  render() {
    const isModalOpen = qs.parse(this.context.router.history.location.search).download === 'true'
    return (
      <span>
        <Modal
          title={`Data Download`}
          visible={isModalOpen}
          onCancel={() => this.reset(true)}
          footer={null}
          maskClosable={true}
        >
          <div style={{ textAlign: 'center' }}>
            <p>Sorry, this functionality is temporarily unavailable.</p>
            <p>For urgent requests please email <strong>support@charitybase.uk</strong></p>
          </div>
        </Modal>
        {this.props.linkText ? (
          <TextButton onClick={() => this.toggleModal(true)}>
            {this.props.linkText}
          </TextButton>
        ) : (
          <Button icon='download' shape='circle' size='small' onClick={() => this.toggleModal(true)} />
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
