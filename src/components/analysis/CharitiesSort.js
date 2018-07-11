import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { Select, Row, Col } from 'antd'


class CharitiesSort extends Component {
  state = {
    index: 0
  }
  componentDidMount() {
    this.initiateDefault(this.props.query.sort)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.query.sort !== this.props.query.sort) {
      this.initiateDefault(nextProps.query.sort)
    }
  }
  initiateDefault = sortField => {
    const index = this.options().reduce((agg, x, i) => (x.fieldName === sortField ? i : agg), 0)
    this.setState({ index })
  }
  options = () => ([
    { label: 'Auto', fieldName: undefined, disabled: () => false},
    { label: 'Relevance', fieldName: '_score:desc', disabled: () => false},
    { label: 'Income', fieldName: 'income.latest.total:desc', disabled: () => false},
    { label: 'Charity Number', fieldName: 'ids.GB-CHC:desc', disabled: () => false},
  ])
  onChange = index => {
    const sortField = this.options()[index].fieldName
    const newQuery = { ...this.props.query, sort: sortField }
    this.context.router.history.push(`?${qs.stringify(newQuery)}`)
  }
  render() {
    return (
      <Row type="flex" justify='end' align='middle' gutter={12}>
        <Col xxl={4} xl={5} lg={6} md={8} sm={12} xs={12} style={{ textAlign: 'right', fontSize: '12px', fontWeight: 500 }}>
          Sort:
        </Col>
        <Col xxl={4} xl={5} lg={6} md={8} sm={12} xs={12}>
          <Select
            size='small'
            value={this.state.index}
            style={{ width: '100%' }}
            onChange={this.onChange}
          >
            {this.options().map((x, i) => (
              <Select.Option key={i} value={i} disabled={x.disabled()}>{x.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    )
  }
}
CharitiesSort.propTypes = {
  query: PropTypes.object,
}
CharitiesSort.contextTypes = {
  router: PropTypes.object,
}

export { CharitiesSort }
