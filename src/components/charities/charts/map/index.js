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
import { Button } from 'antd'
import { AGG_GEOHASH_CHARITIES } from '../../../../lib/gql'
import cluster from './cluster'
import ClusterMarker from './ClusterMarker'
import ClusterListModal from './ClusterListModal'
import RemoveMarker from './RemoveMarker'
import { mapItem } from '../../helpers'

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
  portalBounds = () => {
    const map = this.mapRef.current
    if (!map) return null
    const bounds = map.leafletElement.getBounds()
    return {
      top: Math.min(90, bounds.getNorth()),
      left: Math.max(-180, bounds.getWest()),
      bottom: Math.max(-90, bounds.getSouth()),
      right: Math.min(180, bounds.getEast()),
    }
  }
  onChange = ({ center, zoom }) => {
    const bounds = this.portalBounds()
    if (!bounds) return
    this.setState({
      zoom,
      center,
      bounds,
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
  onFilterChange = boundingBox => {
    const { onAddFilter, onRemoveFilter } = this.props
    const filterItem = mapItem({
      id: 'geo-',
      filterType: 'geo',
      value: boundingBox,
    })
    boundingBox ? onAddFilter(filterItem) : onRemoveFilter(filterItem)
  }
  isValidBounds = bounds => {
    if (bounds.top - bounds.bottom <= 0) return false
    if (bounds.right - bounds.left <= 0) return false
    return true
  }
  render() {
    const { filtersObj, hoveredItem } = this.props
    const { zooming, center, zoom, bounds, selectedCluster } = this.state
    if (!this.isValidBounds(bounds)) return null
    const filtersBounds = filtersObj && filtersObj.geo && filtersObj.geo.boundingBox
    return (
      <Query
        query={AGG_GEOHASH_CHARITIES}
        variables={{ filters: filtersObj, ...bounds }}
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
                maxZoom={19}
                minZoom={4}
                onViewportChanged={this.onChange}
                onZoomend={() => this.setState({ zooming: false })}
                onZoomstart={() => this.setState({ zooming: true })}
                ref={this.mapRef}
                style={{ width : '100%', height: '100%', opacity: (zooming || loading) ? 0.5 : 1 }}
                zoom={zoom}
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
                  <Fragment>
                    <Rectangle
                      bounds={[
                        [filtersBounds.bottom, filtersBounds.left],
                        [filtersBounds.top, filtersBounds.right],
                      ]}
                      className='grab-cursor'
                      color='black'
                      weight={1}
                    />
                    <RemoveMarker
                      center={[filtersBounds.top, filtersBounds.right]}
                      hide={loading || zooming}
                      onClick={() => this.onFilterChange()}
                    />
                  </Fragment>
                ) : null}
                {hoveredItem && hoveredItem.latitude && hoveredItem.longitude ? (
                  <Marker
                    position={[hoveredItem.latitude, hoveredItem.longitude]}
                  />
                ) : null}
              </Map>
              <ClusterListModal
                bounds={bounds}
                filters={filtersObj}
                onClose={this.onModalClose}
                {...selectedCluster}
              />
              <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                <Button
                  icon='filter'
                  onClick={() => this.onFilterChange(bounds)}
                >
                  Filter This Area
                </Button>
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}
CharitiesMap.propTypes = {
  filtersObj: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}

export default CharitiesMap
