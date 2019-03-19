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
  Popup,
} from 'react-leaflet'
import { Query } from 'react-apollo'
import { AGG_GEOHASH_CHARITIES, LIST_CHARITIES } from '../../../lib/gql'
import geohash from 'ngeohash'
import numeral from 'numeral'
import { transparentize } from 'polished'
import { cluster, geoHashesBounds } from '../../../lib/mapHelpers'

const INITIAL_ZOOM = 5
const INITIAL_CENTER = [54.91244, -3.05385]
const POPUP_LIST_MAX_LENGTH = 10

const geohashToLatLng = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return [latitude, longitude]
}

const formatCount = x => numeral(x).format('0a')

const ClusterTooltip = ({ count }) => (
  <Tooltip>
    <div>{formatCount(count)} charities</div>
    {count <= POPUP_LIST_MAX_LENGTH ? (
      <div>(click to list)</div>
    ) : null}
  </Tooltip>
)

const ClusterPopup = ({ count, geohashes, filters }) => (
  count <= POPUP_LIST_MAX_LENGTH ? (
    <Popup autoPan={false}>
      <div style={{ width: '200px' }}>
        <Query
          query={LIST_CHARITIES}
          variables={{ filters: {
            ...filters,
            geo: {
              ...filters.geo,
              boundingBox: geoHashesBounds(geohashes) // todo: merge with pre-existing filter and map bounds too
            }
          } }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'loading...'
            if (error) return 'oops something went wrong'
            return data.CHC.getCharities.list.map(x => (
              <div
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                key={x.id}
              >
                {x.names[0].value}
              </div>
            ))
          }}
        </Query>
      </div>
    </Popup>
  ) : null
)

const strokeDashArray = (radius, dashCount=5) => {
  const strokeDashSum = (Math.PI*2*radius)/5
  return `${0.5*strokeDashSum} ${0.5*strokeDashSum}`
}

const ClusterMarker = ({ key, count, center, filters, geohashes, size, onClick }) => {
  const radius = 20 + 20*size
  return (
    <CircleMarker
      key={key}
      center={center}
      stroke={count <= POPUP_LIST_MAX_LENGTH}
      color='#EC407A'
      dashArray={strokeDashArray(radius)}
      fillColor={transparentize(0.5*(1 - size), '#EC407A')}
      fillOpacity={0.6}
      radius={radius}
      onClick={onClick}
    >
      <ClusterTooltip count={count} />
      <ClusterPopup count={count} geohashes={geohashes} filters={filters} />
    </CircleMarker>
  )
}

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
  onMarkerClick = ({ center, count }) => {
    if (count <= POPUP_LIST_MAX_LENGTH) return
    this.setState(s => ({
      center,
      zoom: s.zoom + 1,
    }))
  }
  relSize = (count, min, max) => {
    return min === max ? 1 : (count - min)/(max - min)
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
              {zooming ? null : clusters.map(x => {
                const size = this.relSize(x.count, clusters[0].count, clusters[clusters.length - 1].count)
                return (
                  <ClusterMarker
                    key={x.key}
                    count={x.count}
                    center={x.center}
                    geohashes={x.geohashes}
                    filters={filters}
                    size={size}
                    onClick={() => this.onMarkerClick(x)}
                  />
                )
              })}
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
