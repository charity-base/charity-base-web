import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { MenuBar } from '../general/MenuBar'
import { SideBarTitle } from '../general/InfoText'

const AnalysisMenu = ({ view, onQueryUpdate }) => (
  <MenuBar
    menuItems={[
      { id: 'grant-size', icon: 'bank', text: 'Grant Size' },
      { id: 'grant-date', icon: 'calendar', text: 'Grant Date' },
      { id: 'grant-funders', icon: 'gift', text: 'Grant Funders' },
      { id: 'charity-location', icon: 'environment-o', text: 'Recipient Location' },
      { id: 'charity-size', icon: 'bank', text: 'Recipient Size' },
      { id: 'recipient-tags-submenu', icon: 'tags-o', text: 'Recipient Tags', items: [
        { id: 'charity-causes', icon: 'medicine-box', text: 'Causes' },
        { id: 'charity-beneficiaries', icon: 'team', text: 'Beneficiaries' },
        { id: 'charity-operations', icon: 'tool', text: 'Operations' },
      ] }
    ]}
    selectedId={view}
    onSelect={view => onQueryUpdate('view', view)}
    renderHeader={() => (
      <div style={{ padding: '20px' }}>
        <SideBarTitle>
          <Icon type='area-chart' style={{ marginRight: '10px' }}/>
          CHARTS VIEW
        </SideBarTitle>
      </div>
    )}
  />
)
AnalysisMenu.propTypes = {
  view: PropTypes.string,
  onQueryUpdate: PropTypes.func,
}

export { AnalysisMenu }
