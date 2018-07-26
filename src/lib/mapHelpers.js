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

const esBoundsToString = bounds => (
  bounds ? (
    roundValuesString(`${bounds.top_left.lat},${bounds.top_left.lon},${bounds.bottom_right.lat},${bounds.bottom_right.lon}`, 12)
  ) : ''
)

const gmapsBoundsToString = bounds => (
  bounds ? (
    roundValuesString(`${bounds.nw.lat},${bounds.nw.lng},${bounds.se.lat},${bounds.se.lng}`, 12)
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

const getCenterZoom = (boundsString, width, height) => {
  const bounds = boundsStringToGmaps(boundsString)
  if (!bounds) return {}
  const { center, zoom } = fitBounds(bounds, { width, height })
  return { center, zoom }
}

const geoHashToLatLon = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return { latitude, longitude }
}

export { zoomToPrecision, esBoundsToString, gmapsBoundsToString, getCenterZoom, geoHashToLatLon }
