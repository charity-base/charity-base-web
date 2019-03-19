import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import {
  Map,
  Rectangle,
  TileLayer,
  Marker,
} from 'react-leaflet'
import { Query } from 'react-apollo'
import geohash from 'ngeohash'
import { AGG_GEOHASH_CHARITIES } from '../../../../lib/gql'
import cluster from './cluster'
import ClusterMarker from './ClusterMarker'
import ClusterListModal from './ClusterListModal'

const INITIAL_ZOOM = 5
const INITIAL_CENTER = [54.91244, -3.05385]
const POPUP_LIST_MAX_LENGTH = 10

const geohashToLatLng = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return [latitude, longitude]
}

class CharitiesMap extends Component {
  state = {
    zoom: INITIAL_ZOOM,
    center: INITIAL_CENTER,
    zooming: false,
    bounds: {
      top: 90,
      left: -180,
      bottom: -90,
      right: 180,
    },
    selectedCluster: {
      open: false,
      geohashes: [],
      count: 0,
    }
  }
  mapRef = createRef()
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
  onChange = ({ center, zoom }) => {
    const map = this.mapRef.current
    if (!map) return
    const bounds = map.leafletElement.getBounds()
    this.setState({
      zoom,
      center,
      bounds: {
        top: bounds.getNorth(),
        left: bounds.getWest(),
        bottom: bounds.getSouth(),
        right: bounds.getEast(),
      }
    })
  }
  onMarkerClick = ({ center, count, geohashes }) => {
    if (count <= POPUP_LIST_MAX_LENGTH) {
      this.setState({
        selectedCluster: {
          open: true,
          geohashes,
          count,
        },
      })
      return
    }
    this.setState(s => ({
      center,
      zoom: s.zoom + 1,
    }))
  }
  relSize = (count, min, max) => {
    return min === max ? 0.5 : (count - min)/(max - min)
  }
  onModalClose = () => {
    this.setState(s => ({
      selectedCluster: {
        ...s.selectedCluster, // to prevent re-triggering list query
        open: false,
      }
    }))
  }
  render() {
    const { filters, hoveredItem } = this.props
    const { zooming, center, zoom, bounds, selectedCluster } = this.state
    const filtersBounds = filters && filters.geo && filters.geo.boundingBox
    return (
      <Query
        query={AGG_GEOHASH_CHARITIES}
        variables={{ filters, ...bounds }}
      >
        {({ loading, error, data }) => {
          if (error) return null
          const buckets = loading ? [] : (
            data.CHC.getCharities.aggregate.geo.geohash.buckets.map(x => ({
              key: x.key,
              center: geohashToLatLng(x.key),
              count: x.count,
            }))
          )
          const clusters = cluster(buckets, bounds, zoom).sort((a, b) => a.count - b.count)
          return (
            <Fragment>
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
                      highlighted={x.count <= POPUP_LIST_MAX_LENGTH}
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
              <ClusterListModal
                bounds={bounds}
                filters={filters}
                onClose={this.onModalClose}
                {...selectedCluster}
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
CharitiesMap.propTypes = {
  filters: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
}

export default CharitiesMap
