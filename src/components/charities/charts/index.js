import React from 'react'
import PropTypes from 'prop-types'
import CharitiesMap from './map'

const CharitiesChart = ({ filters, hoveredItem }) => {
  return (
    <CharitiesMap
      filters={filters}
      hoveredItem={hoveredItem}
    />
  )
}
CharitiesMap.propTypes = {
  filters: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
}

export default CharitiesChart
