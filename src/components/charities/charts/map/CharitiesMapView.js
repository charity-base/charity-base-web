import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { googleApiKey } from '../../../../lib/constants'
import { zoomToPrecision, gmapsBoundsToString, geoHashToLatLon, geoHashToBoundingBox, getCenterZoom } from '../../../../lib/mapHelpers'
import { ContainerWidthConsumer } from '../../../general/ContainerWidthConsumer'
import CharityMarker from './CharityMarker'

class CharitiesMapView extends Component {
  state = {
    geoBoundsString: '57.6266733,-8.4016438,50.9843918,1.8224393',
    zooming: false,
  }
  render() {
    const { data, loading } = this.props
    const { zooming } = this.state
    const minCount = Math.min(...data.map(x => x.doc_count))
    const maxCount = Math.max(...data.map(x => x.doc_count))
    const height = 500
    return (
      <ContainerWidthConsumer>
        {containerWidth => {
          const width = containerWidth
          if (!width) return
          const { center, zoom } = getCenterZoom(this.state.geoBoundsString, width, height)
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
                onZoomAnimationStart={() => {}}
                onZoomAnimationEnd={() => {}}
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
        }}
      </ContainerWidthConsumer>
    )
  }
}
CharitiesMapView.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default CharitiesMapView
