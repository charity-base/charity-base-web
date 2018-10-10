import React, { Component } from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { Button, Switch, Tooltip } from 'antd'
import { googleApiKey } from '../../../../lib/constants'
import { gmapsBoundsToString, geoHashToLatLon, getCenterZoom, isCenterZoomEqual } from '../../../../lib/mapHelpers'
import CharityMarker from './CharityMarker'

const PureMap = ({ zoom, center, onChange, onZoomAnimation, data }) => (
  <GoogleMapReact
    bootstrapURLKeys={{
      key: googleApiKey,
    }}
    zoom={zoom}
    center={center}
    options={{}}
    onChange={onChange}
    onZoomAnimationStart={onZoomAnimation(true)}
    onZoomAnimationEnd={onZoomAnimation(false)}
  >
    {data.sort((a,b) => a.doc_count - b.doc_count).map(x => {
      const { latitude, longitude } = geoHashToLatLon(x.key)
      return <CharityMarker
        key={x.key}
        count={x.doc_count}
        lat={latitude}
        lng={longitude}
        size={x.normalizedCount}
        onClick={() => {}}
      />
    })}
  </GoogleMapReact>
)
PureMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  center: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onZoomAnimation: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
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
    const { data, loading, geoBoundsString, resetOnSearch, onOptionsChange, width, height } = this.props
    const { center, zoom, isZooming } = this.state
    const minCount = Math.min(...data.map(x => x.doc_count))
    const maxCount = Math.max(...data.map(x => x.doc_count))
    return zoom && (
      <div style={{ width, height, position: 'relative', opacity: loading || isZooming ? 0.5 : 1 }}>
        <Button
          icon='close'
          type='primary'
          onClick={() => this.props.onBoundsChange()}
          disabled={!geoBoundsString}
        >
          Clear Map Filter
        </Button>
        <Tooltip title="Auto-reset on search">
          <Switch
            checked={resetOnSearch}
            onChange={resetOnSearch => onOptionsChange({ resetOnSearch })}
          />
        </Tooltip>
        <PureMap
          zoom={zoom}
          center={center}
          onChange={this.onChange}
          onZoomAnimation={this.setZoomState}
          data={data.map(x => ({
            ...x,
            normalizedCount: maxCount > minCount ? (x.doc_count - minCount)/(maxCount - minCount) : 1
          }))}
        />
      </div>
    )
  }
}
CharitiesMapView.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  geoBoundsString: PropTypes.string,
  resetOnSearch: PropTypes.bool.isRequired,
  onBoundsChange: PropTypes.func.isRequired,
  onOptionsChange: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default CharitiesMapView
