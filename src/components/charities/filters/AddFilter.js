import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Icon, Dropdown, Menu, Button } from 'antd'
import { areasOfOperation, causes, beneficiaries, operations } from '../../../lib/filterValues'
import { CheckboxModal } from './CheckboxModal'
import { NumberRangeModal } from './NumberRangeModal'
import { LocationModal } from './LocationModal'

const TagsList = ({ filters, maxDisplayLength, handleClose }) => (
  <div style={{ margin: '20px 0 20px 0' }}>
    {filters.length === 0 && (
      <div style={{textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '12px'}}>no filters applied</div>
    )}
    {filters.map((filter, index) => {
      const isLongName = filter.name.length > maxDisplayLength
      return (
        <div
          style={{marginBottom: '10px'}}
          key={filter.name}
        >
          <Tag
            closable
            afterClose={() => handleClose(filter)}
            style={{ borderColor: '#EC407A' }}
          >
            {isLongName ? `${filter.name.slice(0, maxDisplayLength)}...` : filter.name}
          </Tag>
        </div>
      )
    })}
  </div>
)
TagsList.propTypes = {
  filters: PropTypes.array,
  maxDisplayLength: PropTypes.number,
  handleClose: PropTypes.func,
}

class AddFilter extends Component {
  state = {
    modalConfig: {
      type: null,
      name: null,
      fieldName: null,
      options: [],
    },
  }
  menuItems = () => ([
    { key: '1', icon: 'environment-o', label: 'Location', modalConfig: { type: 'location', name: 'Location Filter', fieldName: 'addressWithin' }},
    { key: '6', icon: 'bank', label: 'Income', modalConfig: { type: 'numberRange', name: 'Income Filter', fieldName: 'incomeRange' }},
    { key: '2', icon: 'global', label: 'Regions', modalConfig: { type: 'checkbox', name: 'Regions of Operation Filter', fieldName: 'areasOfOperation.id', options: areasOfOperation.map(x => ({ ...x, isChecked: false })) }},
    { key: '3', icon: 'medicine-box', label: 'Causes', modalConfig: { type: 'checkbox', name: 'Causes Filter', fieldName: 'causes.id', options: causes.map(x => ({ ...x, isChecked: false })) }},
    { key: '4', icon: 'team', label: 'Beneficiaries', modalConfig: { type: 'checkbox', name: 'Beneficiaries Filter', fieldName: 'beneficiaries.id', options: beneficiaries.map(x => ({ ...x, isChecked: false })) }},
    { key: '5', icon: 'tool', label: 'Operations', modalConfig: { type: 'checkbox', name: 'Operations Filter', fieldName: 'operations.id', options: operations.map(x => ({ ...x, isChecked: false })) }},
  ])
  onMenuClick = ({ key }) => {
    const modalConfig = this.menuItems().reduce((agg, x) => (x.key === key ? x.modalConfig : agg), null)
    this.setState({ modalConfig })
  }
  renderMenu = () => (
    <Menu onClick={this.onMenuClick}>
      {this.menuItems().map(({ key, icon, label }) => (
        <Menu.Item key={key}>
          <Icon type={icon} /> {label}
        </Menu.Item>
      ))}
    </Menu>
  )
  appendFilter = filterString => {
    const { filters } = this.props
    if (!filterString) return filters
    if (filters.filter(x => x.name === filterString).length > 0) return filters
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
    const newFilter = {id: maxId + 1, name: filterString}
    return [...filters, newFilter]
  }
  onCheckboxOk = options => {
    const checkedIds = options.map(x => x.id)
    const filterString = `${this.state.modalConfig.fieldName}=${checkedIds.join(',')}`
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(filterString))
  }
  onNumberRangeOk = valueRange => {
    const filterString = `${this.state.modalConfig.fieldName}=${valueRange.join(',')}`
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(filterString))
  }
  onLocationOk = (km, lat, lon) => {
    const filterString = `${this.state.modalConfig.fieldName}=${km}km,${lat},${lon}`
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(filterString))
  }
  handleClose = removedFilter => {
    const filters = this.props.filters.filter(x => x.id !== removedFilter.id)
    this.props.updateFilters(filters)
  }
  render() {
    const { filters } = this.props
    return (
      <div>
        <TagsList
          filters={filters}
          maxDisplayLength={19}
          handleClose={this.handleClose}
        />
        <Dropdown overlay={this.renderMenu()} trigger={['click']}>
          <Button icon='plus' style={{ width: '100%', color: '#EC407A', borderColor: '#EC407A' }} placement='bottomCenter'>Add Filter</Button>
        </Dropdown>
        <CheckboxModal
          isOpen={this.state.modalConfig.type === 'checkbox'}
          onCancel={() => this.setState({ modalConfig: {} })}
          onOk={this.onCheckboxOk}
          name={this.state.modalConfig.name}
          options={this.state.modalConfig.options}
        />
        <NumberRangeModal
          isOpen={this.state.modalConfig.type === 'numberRange'}
          onCancel={() => this.setState({ modalConfig: {} })}
          onOk={this.onNumberRangeOk}
          name={this.state.modalConfig.name}
        />
        <LocationModal
          isOpen={this.state.modalConfig.type === 'location'}
          onCancel={() => this.setState({ modalConfig: {} })}
          onOk={this.onLocationOk}
          name={this.state.modalConfig.name}
        />
      </div>
    )
  }
}
AddFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.array,
}

export { AddFilter }
