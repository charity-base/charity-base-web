import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { Button, Switch, Tooltip } from 'antd'
import { googleApiKey } from '../../../../lib/constants'
import { gmapsBoundsToString, geoHashToLatLon, geoHashToBoundingBox, getCenterZoom, isCenterZoomEqual } from '../../../../lib/mapHelpers'
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
    {buckets.sort((a,b) => a.doc_count - b.doc_count).map(x => {
      const { latitude, longitude } = geoHashToLatLon(x.key)
      return <BubbleMarker
        key={x.key}
        count={x.doc_count}
        lat={latitude}
        lng={longitude}
        size={x.normalizedCount}
        onClick={() => onBubbleClick(x.key)}
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

class CharitiesMapView extends Component {
  state = {
    zoom: null,
    center: {},
    isZooming: false,
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.geoBoundsString !== this.props.geoBoundsString) {
      const { geoBoundsString, width, height } = this.props
      const centerZoom = getCenterZoom(geoBoundsString, width, height)
      this.updateBounds(centerZoom, geoBoundsString)
    }
  }
  onChange = ({ bounds, center, marginBounds, size, zoom }) => {
    this.updateBounds({ center, zoom }, gmapsBoundsToString(bounds))
  }
  onBubbleClick = geoHash => {
    const geoBoundsString = geoHashToBoundingBox(geoHash)
    const { width, height } = this.props
    const centerZoom = getCenterZoom(geoBoundsString, width, height)
    this.updateBounds(centerZoom, geoBoundsString)
  }
  updateBounds = ({ center, zoom }, geoBoundsString) => {
    if (isCenterZoomEqual({ center, zoom }, this.state)) {
      return
    }
    this.setState({ center, zoom })
    this.props.onBoundsChange(geoBoundsString)
  }
  setZoomState = isZooming => () => {
    this.setState({ isZooming })
  }
  render() {
    const { buckets, points, loading, geoBoundsString, resetOnSearch, onOptionsChange, width, height } = this.props
    const { center, zoom, isZooming } = this.state
    const minCount = Math.min(...buckets.map(x => x.doc_count))
    const maxCount = Math.max(...buckets.map(x => x.doc_count))
    return zoom && (
      <div style={{ width, height, position: 'relative', opacity: loading || isZooming ? 0.5 : 1 }}>
        <Button
          icon='close'
          type='danger'
          onClick={() => this.props.onBoundsChange()}
          disabled={!geoBoundsString}
          style={{ position: 'absolute', top: 5, right: 5, zIndex: 999 }}
        >
          Clear Map Filter
        </Button>
        <Tooltip title="Auto-reset on search">
          <Switch
            checked={resetOnSearch}
            onChange={resetOnSearch => onOptionsChange({ resetOnSearch })}
            style={{ position: 'absolute', top: 5, left: 5, zIndex: 999 }}
          />
        </Tooltip>
        <PureMap
          zoom={zoom}
          center={center}
          onChange={this.onChange}
          onBubbleClick={this.onBubbleClick}
          onZoomAnimation={this.setZoomState}
          buckets={buckets.map(x => ({
            ...x,
            normalizedCount: maxCount > minCount ? (x.doc_count - minCount)/(maxCount - minCount) : 1
          }))}
          points={points}
        />
      </div>
    )
  }
}
CharitiesMapView.propTypes = {
  buckets: PropTypes.array.isRequired,
  points: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  geoBoundsString: PropTypes.string,
  resetOnSearch: PropTypes.bool.isRequired,
  onBoundsChange: PropTypes.func.isRequired,
  onOptionsChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default CharitiesMapView
