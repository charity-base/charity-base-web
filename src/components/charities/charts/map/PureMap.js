import React from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { googleApiKey } from '../../../../lib/constants'
import { BubbleMarker, PointMarker } from './Marker'

const PureMap = ({ zoom, center, onChange, onBubbleClick, onZoomAnimation, buckets, points }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: googleApiKey,
    }}
    zoom={zoom}
    center={center}
    options={{ fullscreenControl: false }}
    onChange={onChange}
    onZoomAnimationStart={onZoomAnimation(true)}
    onZoomAnimationEnd={onZoomAnimation(false)}
  >
    {buckets.sort((a,b) => a.count - b.count).map((x, i) => {
      return <BubbleMarker
        key={i}
        lat={x.lat}
        lng={x.lng}
        count={x.count}
        normCount={x.normCount}
        onClick={() => onBubbleClick({ lat: x.lat, lng: x.lng })}
      />
    })}
    {points.map(({ lat, lng }, i) => (
      <PointMarker
        key={i}
        lat={lat}
        lng={lng}
      />
    ))}
  </GoogleMapReact>
)
PureMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
  onBubbleClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onZoomAnimation: PropTypes.func.isRequired,
  buckets: PropTypes.array.isRequired,
  points: PropTypes.array.isRequired,
}

export default PureMap