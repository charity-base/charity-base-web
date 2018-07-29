import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag, Icon, Dropdown, Menu, Button } from 'antd'
import { areasOfOperation, causes, beneficiaries, operations, funders } from '../../../lib/filterValues'
import { CheckboxModal } from './CheckboxModal'
import { NumberRangeModal } from './NumberRangeModal'
import { LocationModal } from './LocationModal'
import { MultiSelectModal } from './MultiSelectModal'
import { NoneText } from '../../general/NoneText'

const TagsList = ({ filters, maxDisplayLength, handleClose }) => (
  <div style={{ margin: '20px 0 20px 0' }}>
    <div style={{ textAlign: 'center', height: '16px' }}>{Object.keys(filters).length === 0 && <NoneText size={12}>no filters applied</NoneText>}</div>
    {Object.keys(filters).map((name, i) => {
      const tagText = `${name}=${filters[name]}`
      const isLongName = tagText.length > maxDisplayLength
      return (
        <div
          style={{marginBottom: '10px'}}
          key={name}
        >
          <Tag
            closable
            afterClose={() => handleClose(name)}
            style={{ borderColor: '#EC407A' }}
          >
            {isLongName ? `${tagText.slice(0, maxDisplayLength)}...` : tagText}
          </Tag>
        </div>
      )
    })}
  </div>
)
TagsList.propTypes = {
  filters: PropTypes.object,
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
    { key: '7', icon: 'gift', label: 'Funder', modalConfig: { type: 'multi-select', name: 'Funders Filter', fieldName: 'funders', options: funders.map(x => ({ ...x, isChecked: false })) }},
    { key: '2', icon: 'global', label: 'Regions', modalConfig: { type: 'multi-select', name: 'Regions of Operation Filter', fieldName: 'areasOfOperation.id', options: areasOfOperation.map(x => ({ ...x, isChecked: false })) }},
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
        <Menu.Item key={key} style={{ paddingTop: '7px', paddingBottom: '7px' }}>
          <Icon type={icon} style={{ marginRight: '10px' }}/>
          {label}
        </Menu.Item>
      ))}
    </Menu>
  )
  appendFilter = (name, value) => {
    const { filters } = this.props
    return { ...filters, [name] : value }
  }
  onCheckboxOk = options => {
    const checkedIds = options.map(x => x.id)
    const { fieldName } = this.state.modalConfig
    const value = checkedIds.join(',')
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(fieldName, value))
  }
  onNumberRangeOk = valueRange => {
    const { fieldName } = this.state.modalConfig
    const value = valueRange.join(',')
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(fieldName, value))
  }
  onLocationOk = (km, lat, lon) => {
    const { fieldName } = this.state.modalConfig
    const value = `${km}km,${lat},${lon}`
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(fieldName, value))
  }
  onMultiSelectOk = options => {
    const checkedIds = options.map(x => x.id)
    const { fieldName } = this.state.modalConfig
    const value = checkedIds.join(',')
    this.setState({ modalConfig: {} })
    this.props.updateFilters(this.appendFilter(fieldName, value))
  }
  handleClose = fieldName => {
    const filters = { ...this.props.filters, [fieldName]: undefined }
    this.props.updateFilters(filters)
  }
  removeNonFilters = obj => {
    const { sort, view, ...rest } = obj
    return rest
  }
  render() {
    const { filters } = this.props
    return (
      <div>
        <TagsList
          filters={this.removeNonFilters(filters)}
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
        <MultiSelectModal
          isOpen={this.state.modalConfig.type === 'multi-select'}
          onCancel={() => this.setState({ modalConfig: {} })}
          onOk={this.onMultiSelectOk}
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
  filters: PropTypes.object,
}

export { AddFilter }
