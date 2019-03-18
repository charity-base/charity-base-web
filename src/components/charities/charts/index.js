import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
// import ContainerSizeConsumer from '../../general/ContainerSizeConsumer'
// import CharitiesMap from './map'
import {
  CircleMarker,
  Map,
  Rectangle,
  TileLayer,
  Marker,
  Tooltip,
} from 'react-leaflet'
import { Query } from 'react-apollo'
import { AGG_GEOHASH_CHARITIES } from '../../../lib/gql'
import geohash from 'ngeohash'
import numeral from 'numeral'
import { transparentize } from 'polished'
import { cluster } from '../../../lib/mapHelpers'

const INITIAL_ZOOM = 5
const INITIAL_CENTER = [54.91244, -3.05385]

const geohashToLatLng = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return [latitude, longitude]
}

const formatCount = x => numeral(x).format('0a')

class CharitiesChart extends Component {
  state = {
    zoom: INITIAL_ZOOM,
    center: INITIAL_CENTER,
    zooming: false,
    bounds: {
      top: 90,
      left: -180,
      bottom: -90,
      right: 180,
    }
  }
  componentDidMount() {
    this.invalidateSize()
  }
  invalidateSize() {
    const map = this.mapRef.current
    if (!map) return
    setTimeout(() => {
      map.leafletElement.invalidateSize()
    }, 10)
  }
  mapRef = createRef()
  onChange = ({ center, zoom }) => {
    const map = this.mapRef.current
    if (!map) return
    const bounds = map.leafletElement.getBounds()
    this.setState({
      zoom,
      bounds: {
        top: bounds.getNorth(),
        left: bounds.getWest(),
        bottom: bounds.getSouth(),
        right: bounds.getEast(),
      }
    })
  }
  onMarkerClick = ({ center }) => {
    this.setState(s => ({
      center,
      zoom: s.zoom + 1,
    }))
  }
  render() {
    const { filters, hoveredItem } = this.props
    const { zooming, center, zoom, bounds } = this.state
    const filtersBounds = filters && filters.geo && filters.geo.boundingBox
    return (
      <Query
        query={AGG_GEOHASH_CHARITIES}
        variables={{ filters, ...bounds }}
      >
        {({ loading, error, data }) => {
          const buckets = !loading && data && data.CHC ? (
            data.CHC.getCharities.aggregate.geo.geohash.buckets.map(x => ({
              key: x.key,
              center: geohashToLatLng(x.key),
              count: x.count,
            }))
          ) : []
          const clusters = cluster(buckets, bounds, zoom).sort((a, b) => a.count - b.count)
          const size = count => clusters[0].count === clusters[clusters.length - 1].count ? 1 : (
            (count - clusters[0].count)/(clusters[clusters.length - 1].count - clusters[0].count)
          )
          if (error) return null
          return (
            <Map
              center={center}
              zoom={zoom}
              style={{ width : '100%', height: '100%', position: 'relative', opacity: (zooming || loading) ? 0.5 : 1 }}
              onViewportChanged={this.onChange}
              onZoomstart={() => this.setState({ zooming: true })}
              onZoomend={() => this.setState({ zooming: false })}
              ref={this.mapRef}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {zooming ? null : clusters.map(x => (
                <CircleMarker
                  key={x.key}
                  center={x.center}
                  color={null}
                  fillColor={transparentize(0.5*(1 - size(x.count)), '#EC407A')}
                  fillOpacity={0.6}
                  radius={20 + 20*size(x.count)}
                  onClick={() => this.onMarkerClick(x)}
                >
                  <Tooltip>{formatCount(x.count)} charities</Tooltip>
                </CircleMarker>
              ))}
              {filtersBounds ? (
                <Rectangle bounds={[
                  [filtersBounds.bottom, filtersBounds.left],
                  [filtersBounds.top, filtersBounds.right],
                ]} color="black" />
              ) : null}
              {hoveredItem && hoveredItem.latitude && hoveredItem.longitude ? (
                <Marker
                  position={[hoveredItem.latitude, hoveredItem.longitude]}
                />
              ) : null}
            </Map>
          )
        }}
      </Query>
    )
  }
}
CharitiesChart.propTypes = {
  filters: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
}

export default CharitiesChart
