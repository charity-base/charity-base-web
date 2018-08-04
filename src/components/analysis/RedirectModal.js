import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

class RedirectModal extends Component {
  state = {
    isOpen: true,
  }
  onOk = () => {
    this.setState({ isOpen: false })
  }
  onCancel = () => {
    this.props.onQueryUpdate('frozen', '2018-07-31')
  }
  render() {
    return (
      <Modal
        title='Page Updated'
        visible={this.state.isOpen}
        okText='View Latest'
        onOk={this.onOk}
        cancelText='View Competition Entry'
        onCancel={this.onCancel}
      >
        This page was entered into 360Giving's data challenge on 31 July but has been updated since.
      </Modal>
    )
  }
}
RedirectModal.propTypes = {
  onQueryUpdate: PropTypes.func,
}

export { RedirectModal }
