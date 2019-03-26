import React from 'react'
import PropTypes from 'prop-types'
import CharitiesMap from './map'

const CharitiesChart = ({ filtersObj, hoveredItem, onAddFilter, onRemoveFilter }) => {
  return (
    <CharitiesMap
      filtersObj={filtersObj}
      hoveredItem={hoveredItem}
      onAddFilter={onAddFilter}
      onRemoveFilter={onRemoveFilter}
    />
  )
}
CharitiesMap.propTypes = {
  filtersObj: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}

export default CharitiesChart
