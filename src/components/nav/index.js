import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Layout, Button } from 'antd'
import { NavMenu } from './NavMenu'

const { Header, Sider } = Layout

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

const NavSider = ({ isOpen }) => (
  <Sider
    width='100'
    breakpoint='md'
    collapsedWidth={0}
    trigger={null}
    collapsed={!isOpen}
    style={{ position: 'fixed', zIndex: 9, top: '50px', bottom: 0, right: 0 }}
  >
    <NavMenu mode='vertical' />
  </Sider>
)
NavSider.propTypes = {
  isOpen: PropTypes.bool
}

const ToggleButton = styled(Button)`
  position: fixed;
  top: 9px;
  right: 9px;
  border-style: none;
`

class NavBar extends Component {
  state = {
    isMenuOpen: false
  }
  openMenu = () => {
    this.setState(s => ({ isMenuOpen: !s.isMenuOpen }))
  }
  render() {
    const { isMobile } = this.props
    const { isMenuOpen } = this.state
    return([
      <AppHeader key='1' isMobile={isMobile}>
        <HeaderTitle isMobile={isMobile} to="/">CharityBase</HeaderTitle>
        {isMobile && <ToggleButton icon='info-circle' ghost onClick={this.openMenu} />}
        {!isMobile && <NavMenu mode='horizontal' />}
      </AppHeader>,
      <NavSider key='2' isOpen={isMenuOpen} />
    ])
  }
}
NavBar.propTypes = {
  isMobile: PropTypes.bool,
}

export { NavBar }

