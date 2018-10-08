import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Menu, Divider, Icon } from 'antd'

const shortName = name => {
  const maxLength = 16
  const suffix = name.length > maxLength ? '...' : ''
  return name.substr(0, maxLength) + suffix
}

const renderUserDropDown = ({ name, onLogout, onChangePassword, isMobile }) => (
  isMobile ? (
    <Menu.Item key='user-dropdown-menuitem'>
      <a onClick={onLogout}><Icon type='logout'/></a>
    </Menu.Item>
  ) : (
    <Menu.SubMenu
      key='user-dropdown-submenu'
      title={
        <span>{shortName(name)} <Icon type='down' /></span>
      }
    >
      {onChangePassword && (
        <Menu.Item key='user-dropdown-change-password'>
          <a onClick={onChangePassword}>Change Password</a>
        </Menu.Item>
      )}
      <Menu.Item key='user-dropdown-logout'>
        <a onClick={onLogout}>Log Out</a>
      </Menu.Item>
    </Menu.SubMenu>
  )
)

const internalNavs = [
  { to: '/', label: 'Search Charities', icon: 'search', exact: true },
  { to: '/analysis', label: 'Grants Analysis', icon: 'area-chart', exact: false },
  { to: '/api-portal', label: 'API', icon: 'api', theme: 'filled', exact: false },
  { to: '/about', label: 'About', icon: 'question-circle', theme: 'filled', exact: false },
]

const externalNavs = [
  { href: 'https://github.com/charity-base', label: 'GitHub' },
]

const StyledMenu = styled(Menu)`
  height: ${({ isMobile }) => isMobile ? '50px' : '64px'};
  line-height: ${({ isMobile }) => isMobile ? '46px' : '64px'};
`

const NavMenu = ({ isMobile, user, onLogin, onLogout, onChangePassword }) => (
  <StyledMenu
    theme='dark'
    mode='horizontal'
    selectable={false}
    isMobile={isMobile}
  >
    {internalNavs.map(({ to, label, exact, icon, theme }, i) => (
      <Menu.Item key={`${i}-internal`}>
        <NavLink
          to={to}
          exact={exact}
          activeStyle={{
            color: 'rgba(255,255,255,0.9)',
           }}
        >
          <Icon type={icon} theme={theme || 'outlined'} />
          {!isMobile && label}
        </NavLink>
      </Menu.Item>
    ))}
    {!isMobile && <Menu.Item style={{ cursor: 'default' }}>
      {<Divider type='vertical' style={{ marginLeft: '20px', marginRight: '20px', backgroundColor: 'rgba(255,255,255,0.5)' }} />}
    </Menu.Item>}
    {!isMobile && externalNavs.map(({ href, label }, i) => (
      <Menu.Item key={`${i}-external`}>
        <a target='_blank' href={href}>
          <Icon type='link' theme='outlined' />
          {label}
        </a>
      </Menu.Item>
    ))}
    {!isMobile && <Menu.Item style={{ cursor: 'default' }}>
      {<Divider type='vertical' style={{ marginLeft: '20px', marginRight: '20px', backgroundColor: 'rgba(255,255,255,0.5)' }} />}
    </Menu.Item>}
    {user ? (
      renderUserDropDown({
        name: user.given_name || user.nickname || 'User',
        onLogout,
        onChangePassword,
        isMobile,
      })
    ) : (
      <Menu.Item key='auth'>
        <a onClick={onLogin}>
          {isMobile ? <Icon type='login' /> : 'Log In'}
        </a>
      </Menu.Item>
    )}
  </StyledMenu>
)
NavMenu.propTypes = {
  isMobile: PropTypes.bool,
  user: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func,
}

export { NavMenu }
