import React from 'react'
import PropTypes from 'prop-types'
import { CircleMarker, Tooltip } from 'react-leaflet'

const RemoveMarker = ({ center, hide, onClick }) => {
  if (hide) return null
  return (
    <CircleMarker
      center={center}
      onClick={onClick}
      stroke={false}
      color='black'
      fillOpacity={1}
    >
      <Tooltip>
        <div>Remove Filter</div>
      </Tooltip>
    </CircleMarker>
  )
}
RemoveMarker.propTypes = {
  center: PropTypes.array.isRequired,
  hide: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default RemoveMarker
