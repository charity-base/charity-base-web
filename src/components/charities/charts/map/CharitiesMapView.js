import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { googleApiKey } from '../../../../lib/constants'
import { zoomToPrecision, gmapsBoundsToString, geoHashToLatLon, geoHashToBoundingBox, getCenterZoom } from '../../../../lib/mapHelpers'
import CharityMarker from './CharityMarker'

class CharitiesMapView extends Component {
  state = {
    zooming: false,
  }
  setZoomState = zooming => () => {
    this.setState({ zooming })
  }
  render() {
    const { data, loading, geoBoundsString, width, height } = this.props
    const { center, zoom } = getCenterZoom(geoBoundsString, width, height)
    const { zooming } = this.state
    const minCount = Math.min(...data.map(x => x.doc_count))
    const maxCount = Math.max(...data.map(x => x.doc_count))
    return (
      <div style={{ width, height, position: 'relative', opacity: loading || zooming ? 0.5 : 1 }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleApiKey,
          }}
          zoom={zoom}
          center={center}
          options={{}}
          onChange={() => {}}
          onZoomAnimationStart={this.setZoomState(true)}
          onZoomAnimationEnd={this.setZoomState(false)}
        >
          {data.sort((a,b) => a.doc_count - b.doc_count).map(x => {
            const size = maxCount > minCount ? (x.doc_count - minCount)/(maxCount - minCount) : 1
            const { latitude, longitude } = geoHashToLatLon(x.key)
            return <CharityMarker
              key={x.key}
              count={x.doc_count}
              lat={latitude}
              lng={longitude}
              size={size}
              onClick={() => {}}
            />
          })}
        </GoogleMapReact>
      </div>
    )
  }
}
CharitiesMapView.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  geoBoundsString: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default CharitiesMapView
