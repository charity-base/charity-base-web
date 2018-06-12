import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Checkbox } from 'antd'

class CheckboxModal extends Component {
  state = { ...this.props.modalConfig }
  componentDidUpdate(prevProps) {
    if (this.props.modalConfig.name !== prevProps.modalConfig.name) {
      this.setState({ ...this.props.modalConfig })
    }
  }
  changeCheckbox = (i, isChecked) => {
    const { options } = this.state
    this.setState({
      options: [
        ...options.slice(0, i),
        { ...options[i], isChecked },
        ...options.slice(i+1),
      ]
    })
  }
  onOk = () => {
    const { options } = this.state
    const checkedIds = options.reduce((agg, x) => (x.isChecked ? [...agg, x.id] : agg), [])
    const filterString = `${this.state.fieldName}=${checkedIds.join(',')}`
    this.props.onOk(filterString)
  }
  render() {
    return (
      <Modal
        title={this.state.name}
        visible={this.props.isOpen}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
      >
        {this.state.name && this.state.options.map(({ id, name, isChecked }, i) => (
          <div key={i}>
            <Checkbox
              checked={isChecked}
              disabled={false}
              onChange={e => this.changeCheckbox(i, e.target.checked)}
            >
              {name}
            </Checkbox>
          </div>
        ))}
      </Modal>
    )
  }
}
CheckboxModal.propTypes = {
  isOpen: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  modalConfig: PropTypes.object,
}

export { CheckboxModal }
