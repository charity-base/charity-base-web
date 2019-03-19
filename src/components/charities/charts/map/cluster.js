import supercluster from 'supercluster'

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
    geohashes: id ? (
      index.getLeaves(id, 10).map(leaf => leaf.properties.key) // limited to 10 leaves
    ) : [properties.key]
  }))
  return clustered
}

export default cluster
