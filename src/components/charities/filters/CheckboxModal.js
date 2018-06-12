import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Checkbox } from 'antd'

class CheckboxModal extends Component {
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
      >
        {this.state.options && this.state.options.map(({ name, isChecked }, i) => (
          <div key={i}>
            <Checkbox
              checked={isChecked}
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
  name: PropTypes.string,
  options: PropTypes.array,
}

export { CheckboxModal }
