import React from 'react'
import PropTypes from 'prop-types'
import CharitiesMap from './map'

const CharitiesChart = ({ filters, hoveredItem, setFilters }) => {
  return (
    <CharitiesMap
      filters={filters}
      hoveredItem={hoveredItem}
      setFilters={setFilters}
    />
  )
}
CharitiesMap.propTypes = {
  filters: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
  setFilters: PropTypes.func.isRequired,
}

export default CharitiesChart
