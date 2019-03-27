import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Icon } from 'antd'
import { DownloadResults } from '../../general/download'
import { CopyUrl } from '../../general/CopyUrl'
import { MenuBarHeader } from '../../general/MenuBar'
import { SideBarTitle } from '../../general/InfoText'
import Filters from './Filters'
import ResultsCount from './ResultsCount'
import styled from 'styled-components'

const HomeLink = styled.a`
  color: #EC407A;
  font-size: 2em;
  letter-spacing: 0.13em;
  font-weight: 300;
  display: block;
  margin-bottom: 1em;
  :hover {
    color: #D81B60;
  }
`

const SideBar = ({ filtersList, filtersObj, onRemoveFilter }) => (
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
      <ResultsCount
        filtersObj={filtersObj}
      />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={''} /></div>
    </MenuBarHeader>
  </div>
)
SideBar.propTypes = {
  filtersObj: PropTypes.object.isRequired,
  filtersList: PropTypes.array.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}

export default SideBar
