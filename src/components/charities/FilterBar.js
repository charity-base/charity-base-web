import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Divider } from 'antd'
import { DownloadResults } from '../general/DownloadResults'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'

const SideBarContainer = styled.div`
  border-right: solid rgba(0,0,0,0.1) 1px;
  height: 100%;
`

const FilterBar = ({ queryString }) => (
  <SideBarContainer>
    <MenuBarHeader>
      <Filters queryString={queryString} />
      <Divider />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString}/></div>
    </MenuBarHeader>
  </SideBarContainer>
)
FilterBar.propTypes = {
  queryString: PropTypes.string,
}

export { FilterBar }
