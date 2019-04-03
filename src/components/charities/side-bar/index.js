import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon } from 'antd'
import { HomeLink } from '../../general/Layout'
import { DownloadResults } from '../../general/download'
import { CopyUrl } from '../../general/CopyUrl'
import { MenuBarHeader } from '../../general/MenuBar'
import { SideBarTitle } from '../../general/InfoText'
import Filters from './Filters'
import LogInOrOut from '../../general/LogInOrOut'

const SideBar = ({ filtersList, onRemoveFilter }) => (
  <div>
    <MenuBarHeader>
      <HomeLink href="/">CharityBase</HomeLink>
      <SideBarTitle>
        <Icon type='filter' style={{ marginRight: '10px' }}/>
        FILTERS
      </SideBarTitle>
      <Filters
        filtersList={filtersList}
        onClose={onRemoveFilter}
      />
      <Divider />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={''} /></div>
      <Divider />
      <LogInOrOut
        renderLoggedInText={name => <p>Logged in as {name}</p>}
        renderLoggedOutText={name => <p>Log in to enable downloads</p>}
      />
    </MenuBarHeader>
  </div>
)
SideBar.propTypes = {
  filtersList: PropTypes.array.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}

export default SideBar
