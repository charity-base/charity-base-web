import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'

const MenuBar = ({ menuItems, selectedId, defaultOpenKeys, onSelect, renderHeader }) => (
  <div>
    {renderHeader && renderHeader()}
    <Menu
      onClick={e => onSelect(e.key)}
      defaultOpenKeys={defaultOpenKeys ? (
        defaultOpenKeys
      ) : (
        menuItems.reduce((agg, x) => (x.items && x.items.length > 0 ? [...agg, x.id] : agg), [])
      )}
      selectedKeys={[selectedId]}
      mode="inline"
      style={{ borderStyle: 'none' }}
    >
      {menuItems.map(({ id, text, icon, items }) => (
        items && items.length > 0 ? (
          <Menu.SubMenu
            key={id}
            title={<span><Icon type={icon} />{text}</span>}
          >
            {items.map(subItem => (
              <Menu.Item key={subItem.id}>
                <Icon type={subItem.icon} />{subItem.text}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={id}>
            <Icon type={icon} />{text}
          </Menu.Item>
        )
      ))}
    </Menu>
  </div>
)
MenuBar.propTypes = {
  menuItems: PropTypes.array,
  selectedId: PropTypes.string,
  defaultOpenKeys: PropTypes.array,
  onSelect: PropTypes.func,
  renderHeader: PropTypes.func,
}

const MenuBarHeader = styled.div`
  padding: 20px;
  height: 200px;
`

export { MenuBar, MenuBarHeader }
