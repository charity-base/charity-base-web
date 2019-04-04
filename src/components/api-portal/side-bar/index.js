import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon, Menu, Typography } from 'antd'
import { HomeLink } from '../../general/Layout'

const { Title } = Typography
const { Item } = Menu

const SideBarContent = ({ menuItems }) => {
  return (
    <div>
      <div
        style={{
          padding: '1em',
          textAlign: 'center',
        }}
      >
        <HomeLink href="/">CharityBase</HomeLink>
        <Title
          level={4}
          style={{
            color: 'inherit',
          }}
        >
          <Icon type='api' />
          API Portal
        </Title>
      </div>
      <Menu
        selectable={false}
        mode='inline'
        style={{ borderStyle: 'none' }}
        theme='dark'
      >
        {menuItems.map(({ path, label }) => (
          <Item
            key={`path-${path}`}
          >
            {path === 'docs' ? (
              <a href='https://github.com/charity-base/charity-base-api'>
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
  })).isRequired,
}

export default SideBarContent
