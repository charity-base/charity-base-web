import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Menu, Divider, Icon } from 'antd'


const renderUserDropDown = ({ name, onLogout, isMobile }) => (
  isMobile ? (
    <Menu.Item key='user-dropdown-menuitem'>
      <a onClick={onLogout}><Icon type='logout'/></a>
    </Menu.Item>
  ) : (
    <Menu.SubMenu
      key='user-dropdown-submenu'
      title={
        <span>{name} <Icon type='down' /></span>
      }
    >
      <Menu.Item key='user-dropdown-menuitem'>
        <a onClick={onLogout}>Log Out</a>
      </Menu.Item>
    </Menu.SubMenu>
  )
)

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

const NavMenu = ({ isMobile, user, onLogin, onLogout }) => (
  <StyledMenu
    theme='dark'
    mode='horizontal'
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
        </NavLink>
      </Menu.Item>
    ))}
    {!isMobile && <Menu.Item style={{ cursor: 'default' }}>
      {<Divider type='vertical' style={{ marginLeft: '20px', marginRight: '20px', backgroundColor: 'rgba(255,255,255,0.5)' }} />}
    </Menu.Item>}
    {!isMobile && (
      <Menu.SubMenu
        key='external-links-submenu'
        title={
          <span><Icon type="link" />Links</span>
        }
      >
        {externalNavs.map(({ href, label }, i) => (
          <Menu.Item key={`${i}-external`}>
            <a target='_blank' href={href}>
              {label}
            </a>
          </Menu.Item>
        ))}
      </Menu.SubMenu>
    )}
    {!isMobile && <Menu.Item style={{ cursor: 'default' }}>
      {<Divider type='vertical' style={{ marginLeft: '20px', marginRight: '20px', backgroundColor: 'rgba(255,255,255,0.5)' }} />}
    </Menu.Item>}
    {user ? (
      renderUserDropDown({
        name: user.given_name || 'User',
        onLogout: onLogout,
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
}

export { NavMenu }
