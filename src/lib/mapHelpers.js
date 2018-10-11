import { fitBounds } from 'google-map-react/utils'
import geohash from 'ngeohash'

const zoomToPrecision = zoom => {
  const conversion = {
    1: 3,
    2: 3,
    3: 3,
    4: 3,
    5: 3,
    6: 3,
    7: 3,
    8: 4,
    9: 4,
    10: 5,
    11: 5,
    12: 5,
    13: 6,
    14: 6,
    15: 7,
    16: 8,
    17: 9,
    18: 9,
    19: 9,
    20: 9,
    21: 9,
    22: 9,
  }
  return conversion[zoom] || 3
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

const getCenterZoom = (boundsString, width, height) => {
  const bounds = boundsStringToGmaps(boundsString)
  if (!bounds) return defaultCenterZoom
  const { center, zoom } = fitBounds(bounds, { width, height })
  return { center, zoom }
}

const geoHashToLatLon = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return { latitude, longitude }
}

const geoHashToBoundingBox = hash => {
  const [minLat, minLon, maxLat, maxLon] = geohash.decode_bbox(hash)
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

export {
  zoomToPrecision,
  esBoundsToString,
  gmapsBoundsToString,
  getCenterZoom,
  geoHashToLatLon,
  geoHashToBoundingBox,
  isCenterZoomEqual,
}
