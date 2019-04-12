const syncFilters = filtersObj => {
  const filters = []
  if (filtersObj.search) {
    filters.push({
      id: 'search-item',
      value: filtersObj.search,
      label: filtersObj.search,
      filterType: 'search',
    })
  }
  if (filtersObj.geo && filtersObj.geo.boundingBox) {
    filters.push({
      id: 'geo-',
      filterType: 'geo',
      value: filtersObj.geo.boundingBox,
    })
  }
  return filters
}

export default syncFilters
