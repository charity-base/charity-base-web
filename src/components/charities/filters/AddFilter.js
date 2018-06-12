import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon, Dropdown, Menu, Button } from 'antd'
import { areasOfOperation, causes, beneficiaries, operations } from '../../../lib/filterValues'
import { CheckboxModal } from './CheckboxModal'
import { NumberRangeModal } from './NumberRangeModal'

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
    { key: '1', icon: 'environment-o', label: 'Location', modalConfig: { type: 'checkbox', options: ['one', 'two', 'three'] }},
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
  onCheckboxOk = options => {
    const checkedIds = options.map(x => x.id)
    const filterString = `${this.state.modalConfig.fieldName}=${checkedIds.join(',')}`
    this.setState({ modalConfig: {} })
    this.props.onNewFilter(filterString)
  }
  onNumberRangeOk = valueRange => {
    const filterString = `${this.state.modalConfig.fieldName}=${valueRange.join(',')}`
    this.setState({ modalConfig: {} })
    this.props.onNewFilter(filterString)
  }
  render() {
    return (
      <div>
        <Dropdown overlay={this.renderMenu()} trigger={['click']}>
          <Button icon='plus' placement='bottomCenter'>Add Filter</Button>
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
      </div>
    )
  }
}
AddFilter.propTypes = {
  onNewFilter: PropTypes.func.isRequired,
}

export { AddFilter }
