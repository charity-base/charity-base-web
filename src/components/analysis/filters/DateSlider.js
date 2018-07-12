import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import qs from 'query-string'
import { Row, Col, Slider } from 'antd'

class DateSlider extends Component {
  state = {
    numberMonths: 1 + 12*((new Date()).getFullYear() - this.props.sinceYear) + (new Date()).getMonth() - (this.props.sinceMonth-1),
    marks: null,
  }
  stringDate = (d, readable) => {
    return readable ? (
      `${d.toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}`
    ): (
      `${d.getFullYear()}-${numeral(d.getMonth() + 1).format('00')}-${numeral(d.getDate()).format('00')}`
    )
  }
  dateFromMonths = (monthsSince, readable) => {
    return this.stringDate(new Date(this.props.sinceYear, this.props.sinceMonth - 1 + monthsSince, 1), readable)
  }
  onAfterChange = ([startInt, endInt]) => {
    this.setState({ marks: this.getMarks([startInt, endInt])})
    const startDateString = this.dateFromMonths(startInt, false)
    const endDateString = this.dateFromMonths(endInt, false)
    const newQuery = { ...this.props.query, grantDateRange: `${startDateString},${endDateString}` || undefined }
    this.context.router.history.push(`?${qs.stringify(newQuery)}`)
  }
  getMarks = ([startInt, endInt]) => ({
    [startInt]: this.dateFromMonths(startInt, true),
    [endInt]: this.dateFromMonths(endInt, true),
  })
  render() {
    return (
      <Row type='flex' align='middle'>
        <Col span={6}>
          <span style={{ fontWeight: 500, fontSize: '18px' }}>Grants awarded between:</span>
        </Col>
        <Col span={18} style={{padding: '20px'}}>
          <Slider
            range
            min={0}
            max={this.state.numberMonths}
            step={1}
            defaultValue={[0, this.state.numberMonths]}
            onAfterChange={this.onAfterChange}
            tipFormatter={x => this.dateFromMonths(x, true)}
            marks={this.state.marks || this.getMarks([0, this.state.numberMonths])}
          />
        </Col>
      </Row>
    )
  }
}
DateSlider.propTypes = {
  query: PropTypes.object,
  sinceYear: PropTypes.number,
  sinceMonth: PropTypes.number,
}
DateSlider.defaultProps = {
  query: {},
  sinceYear: 1996,
  sinceMonth: 12,
}
DateSlider.contextTypes = {
  router: PropTypes.object,
}

export { DateSlider }
