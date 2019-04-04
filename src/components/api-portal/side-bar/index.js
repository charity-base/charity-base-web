import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon, Menu, Typography } from 'antd'

const { Title } = Typography
const { Item } = Menu

const SideBarContent = ({ menuItems }) => {
  return (
    <div>
      <Title level={3} style={{ color: 'inherit', textAlign: 'center', padding: '1em' }}>
        API Portal
      </Title>
      <Menu
        selectable={false}
        mode='inline'
        style={{ borderStyle: 'none' }}
        theme='dark'
      >
        {menuItems.map(({ path, label, icon }) => (
          <Item
            key={`path-${path}`}
          >
            {path === 'docs' ? (
              <a href='https://github.com/charity-base/charity-base-api'>
                <Icon type={icon} />
                {label}
                <Icon type='link' style={{ marginLeft: '0.5em' }} />
              </a>
            ) : (
              <NavLink
                to={`/api-portal/${path}`}
                exact={true}
                activeStyle={{
                  color: '#EC407A',
                }}
              >
                <Icon type={icon} />
                {label}
              </NavLink>
            )}
          </Item>
        ))}
      </Menu>
    </div>
  )
}
SideBarContent.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })).isRequired,
}

export default SideBarContent
