import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { funders } from '../../../lib/filterValues'

class FunderMultiSelect extends Component {
  state = {
    options: funders.map(x => ({ ...x, isChecked: false })),
  }
  componentDidMount() {
    this.setOptionsFromQueryString(this.props.query.funders)
  }
  componentDidUpdate(prevProps) {
    if (this.props.query.funders !== prevProps.query.funders) {
      this.setOptionsFromQueryString(this.props.query.funders)
    }
  }
  setOptionsFromQueryString = funderIds => {
    const funderIdsArray = typeof funderIds === 'string' ? funderIds.split(',') : []
    this.setState({
      options: funders.map(x => ({
        ...x,
        isChecked: funderIdsArray.indexOf(x.id) > -1
      }))
    })
  }
  changeCheckbox = values => {
    const ids = values.map(x => x.split('::')[0])
    const { options } = this.state
    this.setState({
      options: options.map(x => ({ ...x, isChecked: ids.indexOf(x.id) > -1 ? true : false }))
    })
    this.props.onQueryUpdate('funders', ids.join(','))
  }
  searchableKey = ({ id, name }) => {
    return `${id}::${name}`
  }
  selectedKeys = options => {
    if (!options) return []
    const selected = options.reduce((agg, x) => (x.isChecked ? [...agg, this.searchableKey(x)] : agg), [])
    return selected
  }
  render() {
    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Filter by funder"
        value={this.selectedKeys(this.state.options)}
        onChange={this.changeCheckbox}
      >
        {this.state.options && this.state.options.map((x, i) => (
          <Select.Option key={this.searchableKey(x)}>
            {x.name}
          </Select.Option>
        ))}
      </Select>
    )
  }
}
FunderMultiSelect.propTypes = {
  query: PropTypes.object,
  onQueryUpdate: PropTypes.func,
}
FunderMultiSelect.defaultProps = {
  query: {},
}

export { FunderMultiSelect }
