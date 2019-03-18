// import { fitBounds } from 'google-map-react/utils'
import geohash from 'ngeohash'
import supercluster from 'supercluster'

const zoomToPrecision = zoom => {
  const conversion = {
    1: 3,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 5,
    10: 5,
    11: 5,
    12: 6,
    13: 6,
    14: 7,
    15: 8,
    16: 9,
    17: 10,
    18: 10,
    19: 10,
    20: 10,
    21: 10,
    22: 10,
  }
  return conversion[zoom] || 3
}

const mapBoxZoom = gmapsZoom => {
  const conversion = {
    1: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 5,
    8: 6,
    9: 7,
    10: 8,
    11: 9,
    12: 10,
    13: 11,
    14: 12,
    15: 13,
    16: 14,
    17: 15,
    18: 16,
    19: 17,
    20: 17,
    21: 17,
    22: 17,
  }
  return conversion[gmapsZoom] || 3
}

const round = (x, decimals) => {
  const factor = Math.pow(10, decimals)
  return Math.round(x*factor)/factor
}

const roundValues = (arr, decimals) => arr.map(x => round(x, decimals))

const roundValuesString = (str, decimals) => roundValues(str.split(','), decimals).join(',')

const esBoundsToString = (bounds, decimals=20) => (
  bounds && (bounds.top_left.lat !== bounds.bottom_right.lat) && (bounds.top_left.lon !== bounds.bottom_right.lon) ? (
    roundValuesString(`${bounds.top_left.lat},${bounds.top_left.lon},${bounds.bottom_right.lat},${bounds.bottom_right.lon}`, decimals)
  ) : ''
)

const gmapsBoundsToString = (bounds, decimals=20) => (
  bounds ? (
    roundValuesString(`${bounds.nw.lat},${bounds.nw.lng},${bounds.se.lat},${bounds.se.lng}`, decimals)
  ) : ''
)

const boundsStringToGmaps = boundsString => {
  if (!boundsString) return
  const boundsArray = boundsString.split(',').map(Number)
  const gmapsBounds = {
    nw: {
      lat: boundsArray[0],
      lng: boundsArray[1],
    },
    se: {
      lat: boundsArray[2],
      lng: boundsArray[3],
    }
  }
  return gmapsBounds
}

const defaultCenterZoom = {
  center: {
    lat: 53.021625,
    lng: -1.470896,
  },
  zoom: 4,
}

// const getCenterZoom = (boundsString, width, height) => {
//   const bounds = boundsStringToGmaps(boundsString)
//   if (!bounds) return defaultCenterZoom
//   const { center, zoom } = fitBounds(bounds, { width, height })
//   return { center, zoom }
// }

const geoHashToLatLon = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return { latitude, longitude }
}

const geoHashToBoundingBox = hash => {
  const [minLat, minLon, maxLat, maxLon] = geohash.decode_bbox(hash)
  return [maxLat, minLon, minLat, maxLon].join(',')
}

const geoHashesBounds = hashes => {
  const boundses = hashes.map(hash => geohash.decode_bbox(hash))
  const minLat = Math.min(...boundses.map(x => x[0]))
  const minLon = Math.min(...boundses.map(x => x[1]))
  const maxLat = Math.max(...boundses.map(x => x[2]))
  const maxLon = Math.max(...boundses.map(x => x[3]))
  return [maxLat, minLon, minLat, maxLon].join(',')
}

const isCenterZoomEqual = (x, y, decimals=8) => {
  if (x.zoom !== y.zoom) {
    return false
  }
  if (round(x.center.lat, decimals) !== round(y.center.lat, decimals)) {
    return false
  }
  if (round(x.center.lng, decimals) !== round(y.center.lng, decimals)) {
    return false
  }
  return true
}

const index = supercluster({
  radius: 200,
  extent: 512,
  // minZoom: 0,
  // maxZoom: 17,
  initial: function() { return { sum: 0 } },
  map: function(props) {return { sum: props.count || 0 } },
  reduce: function(acc, props) { acc.sum += (props.sum || 0) }
})

const cluster = (buckets, bounds, leafletZoom) => {
  const geoJsonIn = buckets.map(x => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [x.center[1], x.center[0]]
      },
      properties: {
        key: x.key,
        count: x.count,
      },
    }
  })
  index.load(geoJsonIn)
  const boundsList = [bounds.left, bounds.bottom, bounds.right, bounds.top]
  const geoJsonOut = index.getClusters(boundsList, leafletZoom)
  const clustered = geoJsonOut.map(({ id, geometry, properties }) => ({
    key: id || `geohash-${properties.key}`, // id is undefined if this is a single-geohash cluster
    count: properties.sum || properties.count || 0,
    center: [geometry.coordinates[1], geometry.coordinates[0]],
  }))
  return clustered
}

const getConstituentHashes = clusterId => {
  const leaves = index.getLeaves(clusterId, Infinity)
  return leaves.map(x => x.properties.bucketId)
}

export {
  zoomToPrecision,
  esBoundsToString,
  gmapsBoundsToString,
  // getCenterZoom,
  geoHashToLatLon,
  geoHashToBoundingBox,
  geoHashesBounds,
  isCenterZoomEqual,
  cluster,
  getConstituentHashes,
}
