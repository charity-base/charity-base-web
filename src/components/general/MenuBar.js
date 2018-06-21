import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'

const Container = styled.div`
  border-right: solid rgba(0,0,0,0.1) 1px;
  height: 100%;
`

const MenuBar = ({ menuItems, selectedId, onSelect, renderHeader }) => (
  <Container>
    {renderHeader && renderHeader()}
    <Menu
      onClick={e => onSelect(e.key)}
      selectedKeys={[selectedId]}
      mode="inline"
      style={{ borderStyle: 'none' }}
    >
      {menuItems.map(({ id, text, icon }) => <Menu.Item key={id}><Icon type={icon} />{text}</Menu.Item>)}
    </Menu>
  </Container>
)
MenuBar.propTypes = {
  menuItems: PropTypes.array,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  renderHeader: PropTypes.func,
}

const MenuBarHeader = styled.div`
  padding: 20px;
  height: 200px;
`

export { MenuBar, MenuBarHeader }
