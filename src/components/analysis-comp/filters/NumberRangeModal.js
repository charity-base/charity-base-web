import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Slider } from 'antd'
import numeral from 'numeral'

const marks = {
  0: '£0',
  3: '£1000',
  5: '£100k',
  7: '£10m',
  9: '£1b',
}

class NumberRangeModal extends Component {
  state = {
    name: null,
    valueRange: [3, 6],
  }
  componentDidUpdate(prevProps) {
    const { name } = this.props
    if (name !== prevProps.name) {
      this.setState({ name })
    }
  }
  onOk = () => {
    this.props.onOk(this.state.valueRange.map(x => Math.round(Math.pow(10, x))))
  }
  roundLogarithm = x => {
    return Math.log10(0.1*Math.round(10*Math.pow(10, x)))
  }
  onChange = x => {
    const valueRange = x.map(this.roundLogarithm)
    this.setState({ valueRange })
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
        <div style={{ padding: '20px' }}>
          <Slider
            range
            marks={marks}
            step={0.01}
            value={this.state.valueRange}
            min={0}
            max={10}
            tipFormatter={x => numeral(Math.pow(10,x)).format('($ 0.0 a)').replace('$', '£')}
            onChange={this.onChange}
          />
        </div>
      </Modal>
    )
  }
}
NumberRangeModal.propTypes = {
  isOpen: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  name: PropTypes.string,
}

export { NumberRangeModal }
