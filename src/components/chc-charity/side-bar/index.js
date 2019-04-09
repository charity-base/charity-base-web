import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Divider, Menu, Typography } from 'antd'
import { HomeLink } from '../../general/Layout'

const { Title } = Typography

const SideBarContent = ({ charityId }) => {
  return (
    <div>
      <div
        style={{
          padding: '1em',
          textAlign: 'center',
        }}
      >
        <HomeLink to='/'>CharityBase</HomeLink>
        <Divider />
        <Title
          level={4}
          style={{
            color: 'inherit',
          }}
        >
          Charity # {charityId}
        </Title>
        <Divider />
      </div>
      <Menu
        selectable={false}
        mode='inline'
        defaultOpenKeys={['finances_submenu']}
        style={{ borderStyle: 'none' }}
        theme='dark'
      >
        <Menu.Item key='overview_menu_item'>
          <NavLink
            to={`/chc/${charityId}`}
            exact={true}
            activeStyle={{
              color: '#EC407A',
            }}
          >
            Overview
          </NavLink>
        </Menu.Item>
        <Menu.SubMenu key='finances_submenu' title='Finances'>
          <Menu.Item key='income_menu_item'>
            <NavLink
              to={`/chc/${charityId}/finances`}
              exact={true}
              activeStyle={{
                color: '#EC407A',
              }}
            >
              Income & Spending
            </NavLink>
          </Menu.Item>
          <Menu.Item key='grants_menu_item'>
            <NavLink
              to={`/chc/${charityId}/finances/grants`}
              exact={true}
              activeStyle={{
                color: '#EC407A',
              }}
            >
              Public Grants
            </NavLink>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}
SideBarContent.propTypes = {
  charityId: PropTypes.string.isRequired,
}

export default SideBarContent
