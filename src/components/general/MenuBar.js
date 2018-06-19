import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'

const MenuBar = ({ menuItems, selectedId, onSelect, renderHeader }) => (
  <div>
    {renderHeader && renderHeader()}
    <Menu
      onClick={e => onSelect(e.key)}
      selectedKeys={[selectedId]}
      mode="inline"
    >
      {menuItems.map(({ id, text, icon }) => <Menu.Item key={id}><Icon type={icon} />{text}</Menu.Item>)}
    </Menu>
  </div>
)
MenuBar.propTypes = {
  menuItems: PropTypes.array,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  renderHeader: PropTypes.func,
}

const MenuBarHeader = styled.div`
  padding: 20px;
  border-width: 0 1px 0 0;
  border-style: solid;
  border-color: #EEE;
  height: 200px;
`

export { MenuBar, MenuBarHeader }
