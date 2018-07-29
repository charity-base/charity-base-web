import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { desaturate, transparentize } from 'polished'
import GoogleMapReact from 'google-map-react'
import { Button } from 'antd'
import { googleApiKey } from '../../../lib/constants'
import { zoomToPrecision, gmapsBoundsToString, geoHashToLatLon } from '../../../lib/mapHelpers'

const MarkerContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: -25px;
  top: -25px;
`

const HoverableG = styled.g`
  fill: ${({ percentage }) => transparentize(0.3, desaturate(1-2*(percentage || 0), '#EC407A'))};
  :hover {
    fill: ${({ percentage }) => transparentize(0, desaturate(1-2*(percentage || 0), '#EC407A'))};
  }
`

const CharityMarker = ({ count, size, onClick, minWidth, maxWidth }) => (
  <MarkerContainer>
    <svg style={{ width: '50px', height: '50px', }}>
      <HoverableG
        onClick={onClick}
        percentage={size}
      >
        <circle
          cx='25px'
          cy='25px'
          r={Math.max(minWidth, Math.min(maxWidth, 30*Math.pow(size, 0.5)))}
        />
        <text x='25px' y='25px' textAnchor='middle' fill='#000' strokeWidth='0px' dy='.3em'>
          {count > 9999 ? '9999+' : count}
        </text>
      </HoverableG>
    </svg>
  </MarkerContainer>
)
CharityMarker.defaultProps = {
  minWidth: 10,
  maxWidth: 25,
}


class CharitiesMap extends Component {
  state = {
    zoom: this.props.zoom,
    center: this.props.center,
    geoBoundsString: {},
    zooming: false,
  }
  componentDidUpdate(prevProps, prevState) {
    const { isFreshSearch, center, zoom } = this.props
    if (!isFreshSearch) {
      return
    }
    if (!center || !center.lat || !center.lng) {
      return this.setState({
        center : {lat: 53.99736721765253, lng: -2.2980105271564923},
        zoom : 5,
      })
    }
    if (center.lat !== prevState.center.lat || center.lng !== prevState.center.lng || zoom !== prevState.zoom) {
      this.setState({ center, zoom })
    }
  }
  onBoundsFilter = boundsString => this.props.onQueryUpdate('addressWithin', boundsString)
  render() {
    const { data, onBoundsChange, isGeoFilterApplied, width, height, loading } = this.props
    const minCount = Math.min(...data.map(x => x.doc_count))
    const maxCount = Math.max(...data.map(x => x.doc_count))
    return (
      <div style={{ width, height, position: 'relative', opacity: loading || this.state.zooming ? 0.5 : 1 }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: googleApiKey,
          }}
          zoom={this.state.zoom}
          center={this.state.center}
          options={{}}
          onChange={({ bounds, zoom, center }) => {
            const geoBoundsString = gmapsBoundsToString(bounds)
            const precision = zoomToPrecision(zoom)
            onBoundsChange(geoBoundsString, precision)
            this.setState({ zoom, center, geoBoundsString })
          }}
          onZoomAnimationStart={() => this.setState({ zooming: true })}
          onZoomAnimationEnd={() => this.setState({ zooming: false })}
        >
          {!this.state.zooming && data.sort((a,b) => a.doc_count - b.doc_count).map(x => {
            const size = maxCount > minCount ? (x.doc_count - minCount)/(maxCount - minCount) : 1
            const { latitude, longitude } = geoHashToLatLon(x.key)
            return <CharityMarker
              key={x.key}
              count={x.doc_count}
              lat={latitude}
              lng={longitude}
              size={size}
              onClick={() => this.setState(s => ({
                zoom: s.zoom + 1,
                center: { lat: latitude, lng: longitude }
              }))}
            />
          })}
        </GoogleMapReact>
        <Button
          onClick={() => this.onBoundsFilter(this.state.geoBoundsString)}
          disabled={this.state.zooming}
          style={{ position: 'absolute', top: '10px', right: 5 + width/2 }}
        >
          Filter this area
        </Button>
        <Button
          onClick={() => this.onBoundsFilter(undefined)}
          disabled={this.state.zooming || !isGeoFilterApplied}
          style={{ position: 'absolute', top: '10px', left: 5 + width/2 }}
        >
          Reset map filter
        </Button>
      </div>
    )
  }
}
CharitiesMap.propTypes = {
  data: PropTypes.array,
  onBoundsChange: PropTypes.func,
  onQueryUpdate: PropTypes.func,
  isGeoFilterApplied: PropTypes.bool,
  center: PropTypes.object,
  zoom: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  isFreshSearch: PropTypes.bool,
  loading: PropTypes.bool,
}

export { CharitiesMap }
