import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Slider, Input, InputNumber, Row, Col } from 'antd'
import numeral from 'numeral'

const marks = {
  10: '10km',
  20: '20km',
}

class LocationModal extends Component {
  state = {
    name: null,
    value: 5,
    postcode: '',
    errorMessage: '',
  }
  componentDidUpdate(prevProps) {
    const { name } = this.props
    if (name !== prevProps.name) {
      this.setState({ name })
    }
  }
  onOk = () => {
    fetch(`http://api.postcodes.io/postcodes/${this.state.postcode}`)
    .then(x => x.json())
    .then(({ status, error, result }) => {
      this.setState({ errorMessage: error })
      if (status !== 200 || error) return
      const { latitude, longitude } = result
      this.props.onOk(this.state.value, latitude, longitude)
    })
    .catch(x => console.log(x))
  }
  onChange = value => {
    this.setState({ value })
  }
  render() {
    return (
      <Modal
        title={this.state.name}
        visible={this.props.isOpen}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
      >
        <div style={{ padding: '20px' }}>
          <Row>
            <Col span={12}>
              <Slider
                marks={marks}
                step={1}
                value={this.state.value}
                min={1}
                max={20}
                tipFormatter={x => `${x}km`}
                onChange={this.onChange}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={20}
                style={{ marginLeft: 16 }}
                value={this.state.value}
                onChange={this.onChange}
              />
            </Col>
          </Row>

          <Input
            size="large"
            placeholder='Postcode'
            value={this.state.postcode}
            onChange={e => this.setState({ postcode: e.target.value.toUpperCase() })}
          />

          <div style={{color: 'red'}}>{this.state.errorMessage}</div>
        </div>
      </Modal>
    )
  }
}
LocationModal.propTypes = {
  isOpen: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  name: PropTypes.string,
}

export { LocationModal }
