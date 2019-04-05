import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import TextButton from '../general/TextButton'

const shortName = name => {
  const maxLength = 16
  const suffix = name.length > maxLength ? '...' : ''
  return name.substr(0, maxLength) + suffix
}

const renderUserDropDown = ({ name, onLogout, onChangePassword, isMobile }) => (
  isMobile ? (
    <Menu.Item key='user-dropdown-menuitem'>
      <TextButton onClick={onLogout} underline={false} light>
        <Icon type='logout'/>
      </TextButton>
    </Menu.Item>
  ) : (
    <Menu.SubMenu
      key='user-dropdown-submenu'
      title={
        <span>
          <Icon type='user' />
          {shortName(name)}
        </span>
      }
    >
      {onChangePassword && (
        <Menu.Item key='user-dropdown-change-password'>
          <TextButton onClick={onChangePassword} underline={false} light>
            <Icon type='idcard' />
            Change Password
          </TextButton>
        </Menu.Item>
      )}
      <Menu.Item key='user-dropdown-logout'>
        <TextButton onClick={onLogout} underline={false} light>
          <Icon type='logout' />
          Log Out
        </TextButton>
      </Menu.Item>
    </Menu.SubMenu>
  )
)

const internalNavs = [
  { to: '/', label: 'Search', icon: 'search', exact: true },
  { to: '/api-portal', label: 'API', icon: 'api', theme: 'filled', exact: false },
  { to: '/about', label: 'About', icon: 'question-circle', theme: 'filled', exact: false },
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
    {user ? (
      renderUserDropDown({
        name: user.given_name || user.nickname || 'User',
        onLogout,
        onChangePassword,
        isMobile,
      })
    ) : (
      <Menu.Item key='auth'>
        <TextButton onClick={onLogin} underline={false} light>
          <Icon type='login' />
          {isMobile ? '' : 'Log In'}
        </TextButton>
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
