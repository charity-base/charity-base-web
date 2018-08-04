import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Modal, Input, InputNumber, Row, Col, Icon } from 'antd'

const Text = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`

class LocationModal extends Component {
  state = {
    name: null,
    value: 3,
    postcode: '',
    errorMessage: '',
    isFetchingPostcode: false,
  }
  componentDidUpdate(prevProps) {
    const { name } = this.props
    if (name !== prevProps.name) {
      this.setState({ name })
    }
  }
  onOk = () => {
    const { postcode } = this.state
    if (!postcode) {
      return this.setState({ errorMessage: 'Please enter a postcode' })
    }
    this.setState({ isFetchingPostcode: true })
    fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    .then(x => x.json())
    .then(({ status, error, result }) => {
      this.setState({ errorMessage: error, isFetchingPostcode: false })
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
        okText='Filter'
      >
        <div style={{ padding: '20px' }}>
          <Row justify='center' type='flex'>
            <Col xxl={8} xl={8} lg={8} md={12} sm={20} xs={24}>
              <Text>Within</Text>
              <InputNumber
                min={1}
                max={20}
                size="large"
                style={{ width: '100%' }}
                value={this.state.value}
                onChange={this.onChange}
                formatter={value => `${String(value).replace('k', '').replace('m', '')}km`}
                parser={value => value.replace('km', '')}
              />
              <Text>of</Text>
              <Input
                size="large"
                style={{ width: '100%' }}
                placeholder='Postcode'
                value={this.state.postcode}
                onChange={e => this.setState({ postcode: e.target.value.toUpperCase() })}
                prefix={<Icon type='environment-o' />}
                onPressEnter={this.onOk}
              />
            </Col>
          </Row>
          <div style={{ color: 'red', height: '20px' }}>{this.state.errorMessage}</div>
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
