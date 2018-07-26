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

const esBoundsToString = bounds => (
  bounds ? (
    `${bounds.top_left.lat},${bounds.top_left.lon},${bounds.bottom_right.lat},${bounds.bottom_right.lon}`
  ) : ''
)

const gmapsBoundsToString = bounds => (
  bounds ? (
    `${bounds.nw.lat},${bounds.nw.lng},${bounds.se.lat},${bounds.se.lng}`
  ) : ''
)

const esBoundsToGmaps = boundingBox => {
  if (!boundingBox) return
  const { top_left, bottom_right } = boundingBox
  if (!top_left || !bottom_right) return
  const gmapsBounds = {
    nw: {
      lat: top_left.lat,
      lng: top_left.lon,
    },
    se: {
      lat: bottom_right.lat,
      lng: bottom_right.lon,
    }
  }
  return gmapsBounds
}

const getCenterZoom = (esBounds, { width, height }) => {
  const bounds = esBoundsToGmaps(esBounds)
  if (!bounds) return {}
  const { center, zoom } = fitBounds(bounds, { width, height })
  return { center, zoom }
}

const geoHashToLatLon = hash => {
  const { latitude, longitude } = geohash.decode(hash)
  return { latitude, longitude }
}

export { zoomToPrecision, esBoundsToString, gmapsBoundsToString, esBoundsToGmaps, getCenterZoom, geoHashToLatLon }
