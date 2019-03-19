import React from 'react'
import PropTypes from 'prop-types'
import { transparentize } from 'polished'
import numeral from 'numeral'
import { CircleMarker, Tooltip } from 'react-leaflet'

const formatCount = x => numeral(x).format('0a')

const ClusterTooltip = ({ count }) => (
  <Tooltip>
    <div>{formatCount(count)} {count === 1 ? 'charity' : 'charities'}</div>
  </Tooltip>
)
ClusterTooltip.propTypes = {
  count: PropTypes.number.isRequired,
}

const strokeDashArray = (radius, dashCount=5) => {
  const strokeDashSum = (Math.PI*2*radius)/5
  return `${0.5*strokeDashSum} ${0.5*strokeDashSum}`
}

const ClusterMarker = ({ count, center, highlighted, size, onClick }) => {
  const radius = 20 + 20*size
  return (
    <CircleMarker
      center={center}
      stroke={highlighted}
      color='#EC407A'
      dashArray={strokeDashArray(radius)}
      fillColor={transparentize(0.5*(1 - size), '#EC407A')}
      fillOpacity={0.6}
      radius={radius}
      onClick={onClick}
    >
      <ClusterTooltip count={count} />
    </CircleMarker>
  )
}
ClusterMarker.propTypes = {
  count: PropTypes.number.isRequired,
  center: PropTypes.array.isRequired,
  highlighted: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ClusterMarker