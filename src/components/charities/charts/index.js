import React, { Component, Fragment, createRef } from 'react'
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
import { List, Modal, Skeleton } from 'antd'
import geohash from 'ngeohash'
import numeral from 'numeral'
import { transparentize } from 'polished'
import { AGG_GEOHASH_CHARITIES, LIST_CHARITIES } from '../../../lib/gql'
import { cluster } from '../../../lib/mapHelpers'

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
    <div>{formatCount(count)} {count === 1 ? 'charity' : 'charities'}</div>
  </Tooltip>
)

const strokeDashArray = (radius, dashCount=5) => {
  const strokeDashSum = (Math.PI*2*radius)/5
  return `${0.5*strokeDashSum} ${0.5*strokeDashSum}`
}

const ClusterMarker = ({ count, center, size, onClick }) => {
  const radius = 20 + 20*size
  return (
    <CircleMarker
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
    </CircleMarker>
  )
}

const boundingBoxIntersection = (listOfBounds) => {
  return listOfBounds.reduce((agg, x) => ({
    top: x && x.top < agg.top ? x.top : agg.top,
    left: x && x.left > agg.left ? x.left : agg.left,
    bottom: x && x.bottom > agg.bottom ? x.bottom : agg.bottom,
    right: x && x.right < agg.right ? x.right : agg.right,
  }), {
    top: 90,
    left: -180,
    bottom: -90,
    right: 180,
  })
}

const ClusterListModal = ({ bounds, count, geohashes, filters, open, onClose }) => (
  <Modal
    visible={open}
    onCancel={onClose}
    footer={null}
    maskClosable={true}
  >
    <Query
      query={LIST_CHARITIES}
      variables={{ filters: {
        ...filters,
        geo: {
          ...filters.geo,
          geohashes,
          boundingBox: boundingBoxIntersection([
            filters.geo ? filters.geo.boundingBox : null,
            bounds,
          ]),
        }
      } }}
    >
      {({ loading, error, data }) => {
        if (error) return 'oops something went wrong'
        return (
          <div
            style={{
              maxHeight: '800px',
              overflowY: 'scroll',
              padding: '1em',
              marginTop: '2em',
              backgroundColor: '#FAFAFA',
              borderRadius: '0.5em',
            }}
          >
            <List
              itemLayout="vertical"
              size="large"
              dataSource={loading ? [...new Array(count)].map((_, id) => ({ id })) : data.CHC.getCharities.list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                >
                  <Skeleton loading={loading} active>
                    <List.Item.Meta
                      title={<a href='/'>{item.names ? item.names[0].value : null}</a>}
                    />
                    {item.activities ? item.activities.slice(0, 240)+'...' : null}
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        )
      }}
    </Query>
  </Modal>
)

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
    },
    selectedCluster: {
      open: false,
      geohashes: [],
      count: null,
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
    return min === max ? 1 : (count - min)/(max - min)
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
                onClose={this.onModalClose}
                filters={filters}
                {...selectedCluster}
              />
            </Fragment>
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
