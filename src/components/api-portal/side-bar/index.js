import React from 'react'
import PropTypes from 'prop-types'
import { MenuBar, MenuBarHeader } from '../../general/MenuBar'

const SideBarContent = ({ menuItems, onSelect, selectedId }) => {
  return (
    <MenuBar
      menuItems={menuItems}
      selectedId={selectedId}
      onSelect={onSelect}
      renderHeader={() => (
        <MenuBarHeader>
          API Portal
        </MenuBarHeader>
      )}
    />
  )
}
SideBarContent.propTypes = {
  menuItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.string.isRequired,
}

export default SideBarContent
