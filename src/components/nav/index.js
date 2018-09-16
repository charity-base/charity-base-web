import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Layout } from 'antd'
import { NavMenu } from './NavMenu'
import Auth from '../../lib/Auth'

const auth = new Auth()

const { Header } = Layout

const AppHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: ${({ isMobile }) => isMobile ? '50px' : '64px'};
`

const HeaderTitle = styled(NavLink)`
  color: #EC407A;
  height: ${({ isMobile }) => isMobile ? '50px' : '64px'};
  line-height: ${({ isMobile }) => isMobile ? '46px' : '59px'};
  font-size: ${({ isMobile }) => isMobile ? '26px' : '32px'};
  letter-spacing: 3px;
  font-weight: ${({ isMobile }) => isMobile ? '300' : '500'};
  text-align: middle;
  margin: 2px 28px 2px ${({ isMobile }) => isMobile ? '20px' : '0px'};
  float: left;
  :hover {
    color: #D81B60;
  }
`

class NavBar extends Component {
  render() {
    const { isMobile } = this.props
    return(
      <AppHeader isMobile={isMobile}>
        {!isMobile && <HeaderTitle isMobile={isMobile} to="/">CharityBase</HeaderTitle>}
        <NavMenu
          isMobile={isMobile}
          user={auth.getUser()}
          onLogin={() => auth.login(this.context.router.history)}
          onLogout={() => auth.logout()}
        />
      </AppHeader>
    )
  }
}
NavBar.propTypes = {
  isMobile: PropTypes.bool,
}
NavBar.contextTypes = {
  router: PropTypes.object,
}

export { NavBar }

