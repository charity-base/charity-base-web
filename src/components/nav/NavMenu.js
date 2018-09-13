import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Menu, Divider, Dropdown, Icon } from 'antd'

const UserDropdown = ({ name, onLogout }) => (
  <Dropdown
    overlay={
      <Menu>
        <Menu.Item key="0">
          <a onClick={onLogout}>Log Out</a>
        </Menu.Item>
      </Menu>
    }
    trigger={['click']}
  >
    <a className="ant-dropdown-link" href="#">
      {name} <Icon type="down" />
    </a>
  </Dropdown>
)
UserDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
}

const internalNavs = [
  { to: '/', label: 'Search Charities', icon: 'search', exact: true },
  { to: '/analysis', label: 'Grants Analysis', icon: 'area-chart', exact: false },
  { to: '/about', label: 'About', icon: 'question-circle', exact: false },
]

const externalNavs = [
  { href: 'https://charity-base.github.io/charity-base-docs', label: 'API Docs' },
  { href: 'https://github.com/charity-base', label: 'GitHub' },
]

const StyledMenu = styled(Menu)`
  height: ${({ isMobile }) => isMobile ? '50px' : '64px'};
  line-height: ${({ isMobile }) => isMobile ? '46px' : '64px'};
`

const NavMenu = ({ mode, isMobile, user, onLogin, onLogout }) => (
  <StyledMenu
    theme="dark"
    mode={mode}
    selectable={false}
    isMobile={isMobile}
  >
    {internalNavs.map(({ to, label, exact, icon }, i) => (
      <Menu.Item key={`${i}-internal`}>
        <NavLink
          to={to}
          exact={exact}
          activeStyle={{
            color: 'rgba(255,255,255,0.9)',
           }}
        >
          <Icon type={icon} />
          {!isMobile && label}
          {!isMobile && label === 'Grants Analysis' && <span style={{ marginLeft: '10px', fontSize: '12px', color: '#EC407A' }}>new!</span>}
        </NavLink>
      </Menu.Item>
    ))}
    {!isMobile && <Menu.Item style={{ cursor: 'default' }}>
      {mode === 'horizontal' && <Divider type='vertical' style={{ marginLeft: '20px', marginRight: '20px', backgroundColor: 'rgba(255,255,255,0.5)' }} />}
      {mode === 'vertical' && <Divider type='horizontal' style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />}
    </Menu.Item>}
    {!isMobile && externalNavs.map(({ href, label }, i) => (
      <Menu.Item key={`${i}-external`} icon='plus'>
        <a target='_blank' href={href}>
          <Icon type='link' />
          {label}
        </a>
      </Menu.Item>
    ))}
    <Menu.Item key='auth'>
      {user ? (
        <UserDropdown
          name={user.given_name || 'User'}
          onLogout={onLogout}
        />
      ) : (
        <a onClick={onLogin}>
          Log In
        </a>
      )}
    </Menu.Item>
  </StyledMenu>
)
NavMenu.propTypes = {
  mode: PropTypes.string,
  isMobile: PropTypes.bool,
  user: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export { NavMenu }
