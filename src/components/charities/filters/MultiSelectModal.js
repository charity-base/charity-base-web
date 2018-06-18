import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Select } from 'antd'

class MultiSelectModal extends Component {
  state = {
    name: null,
    options: [],
  }
  componentDidUpdate(prevProps) {
    const { name, options } = this.props
    if (name !== prevProps.name) {
      this.setState({ name, options })
    }
  }
  changeCheckbox = values => {
    const ids = values.map(x => x.split('::')[0])
    const { options } = this.state
    this.setState({
      options: options.map(x => ({ ...x, isChecked: ids.indexOf(x.id) > -1 ? true : false }))
    })
  }
  searchableKey = ({ id, name }) => {
    return `${id}::${name}`
  }
  selectedKeys = () => {
    const { options } = this.state
    if (!options) return
    const selected = options.reduce((agg, x) => (x.isChecked ? [...agg, this.searchableKey(x)] : agg), [])
    return selected
  }
  onOk = () => {
    const checkedOptions = this.state.options.filter(x => x.isChecked)
    this.props.onOk(checkedOptions)
  }
  render() {
    return (
      <Modal
        title={this.state.name}
        visible={this.props.isOpen}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        okText='Filter'
      >
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          value={this.selectedKeys()}
          onChange={this.changeCheckbox}
        >
          {this.state.options && this.state.options.map((x, i) => (
            <Select.Option key={this.searchableKey(x)}>
              {x.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    )
  }
}
MultiSelectModal.propTypes = {
  isOpen: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.array,
}

export { MultiSelectModal }
