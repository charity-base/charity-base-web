import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout

const CharityMenuBar = ({ menuItems, selectedKey, onSelect }) => (
  <Sider width={200} style={{ background: '#fff', marginTop: '50px' }}>
    <Menu
      onClick={e => onSelect(e.key)}
      selectedKeys={[selectedKey]}
      mode="inline"
    >
      {menuItems.map(({ text, icon }) => <Menu.Item key={text}><Icon type={icon} />{text}</Menu.Item>)}
    </Menu>
  </Sider>
)
CharityMenuBar.propTypes = {
  menuItems: PropTypes.array,
  selectedKey: PropTypes.string,
  onSelect: PropTypes.func,
}

export { CharityMenuBar }
