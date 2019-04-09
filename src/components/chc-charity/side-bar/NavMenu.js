import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon, Menu } from 'antd'

const subMenuChcKey = x => `submenu_chc_${x}`
const subMenuChcFinancesKey = x => `submenu_chc_finances_${x}`

const NavMenu = ({ chcIds }) => {
  return (
    <Menu
      selectable={false}
      mode='inline'
      openKeys={[
        'submenu_chc',
        ...chcIds.map(subMenuChcKey),
        ...chcIds.map(subMenuChcFinancesKey),
        'submenu_api',
      ]}
      style={{ borderStyle: 'none' }}
      theme='dark'
    >
      <Menu.SubMenu
        key='submenu_chc'
        title='England & Wales'
      >
        <Menu.Item
          key='chc_search'
        >
          <NavLink
            to={`/chc`}
            exact={true}
            activeStyle={{
              color: '#EC407A',
            }}
          >
            Search
          </NavLink>
        </Menu.Item>
        {chcIds.map(x => (
          <Menu.SubMenu
            key={subMenuChcKey(x)}
            title={`Charity ${x}`}
          >
            <Menu.Item
              key={`menu_item_chc_overview_${x}`}
            >
              <NavLink
                to={`/chc/${x}`}
                exact={true}
                activeStyle={{
                  color: '#EC407A',
                }}
              >
                Overview
              </NavLink>
            </Menu.Item>
            <Menu.SubMenu
              key={subMenuChcFinancesKey(x)}
              title='Finances'
            >
              <Menu.Item
                key={`menu_item_chc_income_${x}`}
              >
                <NavLink
                  to={`/chc/${x}/finances`}
                  exact={true}
                  activeStyle={{
                    color: '#EC407A',
                  }}
                >
                  Income & Spending
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key={`menu_item_chc_grants_${x}`}
              >
                <NavLink
                  to={`/chc/${x}/finances/grants`}
                  exact={true}
                  activeStyle={{
                    color: '#EC407A',
                  }}
                >
                  Public Grants
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        ))}
      </Menu.SubMenu>
      <Menu.SubMenu
        key='submenu_api'
        title='API'
      >
        <Menu.Item
          key='menu_item_api_portal_overview'
        >
          <NavLink
            to={`/api-portal`}
            exact={true}
            activeStyle={{
              color: '#EC407A',
            }}
          >
            Getting Started
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key='menu_item_api_portal_keys'
        >
          <NavLink
            to={`/api-portal/keys`}
            exact={true}
            activeStyle={{
              color: '#EC407A',
            }}
          >
            API Keys
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key='menu_item_api_portal_playground'
        >
          <NavLink
            to={`/api-portal/playground`}
            exact={true}
            activeStyle={{
              color: '#EC407A',
            }}
          >
            Playground
          </NavLink>
        </Menu.Item>
        <Menu.Item
          key='menu_item_api_portal_docs'
        >
          <a href='https://github.com/charity-base/charity-base-api'>
            Docs
            <Icon type='link' style={{ marginLeft: '0.5em' }} />
          </a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
NavMenu.propTypes = {
  charityId: PropTypes.string.isRequired,
}

export default NavMenu
