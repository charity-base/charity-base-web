import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { MenuBar } from '../general/MenuBar'
import { SideBarTitle } from '../general/InfoText'

const AnalysisMenu = ({ view, onQueryUpdate }) => (
  <MenuBar
    menuItems={[
      { id: 'grant-topics', icon: 'tags-o', text: 'Grant Topics' },
      { id: 'grant-funders', icon: 'gift', text: 'Grant Funders' },
      { id: 'grant-size', icon: 'bank', text: 'Grant Size' },
      { id: 'grant-date', icon: 'calendar', text: 'Grant Date' },
      { id: 'charity-location', icon: 'environment-o', text: 'Recipient Location' },
      { id: 'charity-size', icon: 'bank', text: 'Recipient Size' },
      { id: 'charity-causes', icon: 'medicine-box', text: 'Recipient Causes' },
      { id: 'charity-beneficiaries', icon: 'team', text: 'Recipient Beneficiaries' },
      { id: 'charity-operations', icon: 'tool', text: 'Recipient Operations' },
    ]}
    selectedId={view}
    onSelect={view => onQueryUpdate('view', view)}
    renderHeader={() => (
      <div style={{ padding: '20px' }}>
        <SideBarTitle>
          <Icon type='area-chart' style={{ marginRight: '10px' }}/>
          CHARTS
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
