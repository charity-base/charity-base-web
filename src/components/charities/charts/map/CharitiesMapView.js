import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Switch } from 'antd'
import { gmapsBoundsToString, getCenterZoom, isCenterZoomEqual, cluster } from '../../../../lib/mapHelpers'
import PureMap from './PureMap'

const MAX_ZOOM = 22

const MapActionsContainer = styled.div`
position: absolute;
top: 5px;
right: 5px;
z-index: 999;
`

class CharitiesMapView extends Component {
  state = {
    zoom: null,
    center: {},
    isZooming: false,
    clusteredBuckets: [],
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.geoBoundsString !== this.props.geoBoundsString) {
      const { geoBoundsString, width, height } = this.props
      const centerZoom = getCenterZoom(geoBoundsString, width, height)
      if (!isCenterZoomEqual(centerZoom, this.state)) {
        this.updateBounds(centerZoom, geoBoundsString)
      }
    }
    if (prevProps.loading && !this.props.loading) {
      const clusteredBuckets = cluster(this.props.buckets, this.state.zoom)
      this.setState({ clusteredBuckets })
    }
  }
  onChange = ({ bounds, center, marginBounds, size, zoom }) => {
    const { geoBoundsString, width, height } = this.props
    const centerZoom = getCenterZoom(geoBoundsString, width, height)
    if (!isCenterZoomEqual({ center, zoom }, centerZoom)) {
      this.updateBounds({ center, zoom }, gmapsBoundsToString(bounds))
    }
  }
  onBubbleClick = center => {
    this.setState(s => ({ center, zoom: Math.min(s.zoom + 1, MAX_ZOOM) }))
  }
  updateBounds = ({ center, zoom }, geoBoundsString) => {
    this.setState({ center, zoom })
    this.props.onBoundsChange(geoBoundsString)
  }
  setZoomState = isZooming => () => {
    this.setState({ isZooming })
  }
  render() {
    const { points, loading, geoBoundsString, resetOnSearch, onOptionsChange, width, height } = this.props
    const { center, zoom, isZooming, clusteredBuckets } = this.state
    return zoom && (
      <div style={{ width, height, position: 'relative', opacity: loading || isZooming ? 0.5 : 1 }}>
        <MapActionsContainer>
          <Button
            icon='close'
            onClick={() => this.props.onBoundsChange()}
            disabled={!geoBoundsString}
          >
            Reset Filter
          </Button>
          <div
            style={{ backgroundColor: '#FFF', marginTop: '3px', padding: '5px 10px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
          >
            <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '12px', marginRight: '5px', }}>
              AUTORESET
            </span>
            <Switch
              checked={resetOnSearch}
              size='small'
              onChange={resetOnSearch => onOptionsChange({ resetOnSearch })}
            />
          </div>
        </MapActionsContainer>
        <PureMap
          zoom={zoom}
          center={center}
          onChange={this.onChange}
          onBubbleClick={this.onBubbleClick}
          onZoomAnimation={this.setZoomState}
          buckets={(isZooming || loading) ? [] : clusteredBuckets}
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
