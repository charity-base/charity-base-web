import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Select } from 'antd'
import { InfoText } from '../../general/InfoText'

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
        {this.state.name === 'Funders Filter' && (
          <InfoText>
            Uses data from <a rel='noopener noreferrer' target='_blank' href='http://grantnav.threesixtygiving.org/datasets/'>GrantNav</a>, a <a rel='noopener noreferrer' target='_blank' href='http://www.threesixtygiving.org/'>360Giving</a> application released under the terms of the <a rel='noopener noreferrer' target='_blank' href='https://creativecommons.org/licenses/by-sa/4.0/'>Creative Commons Attribution Sharealike license (CC-BY-SA)</a>
          </InfoText>
        )}
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
