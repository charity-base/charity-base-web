const LIST_LOGIC = 'some'

const appendOrRemove = (list, value, remove) => {
  if (remove) {
    return list.filter(x => x !== value)
  }
  return Array.from(new Set([ ...list, value, ]))
}

const reduceFilters = (filters, filterType, value, remove=false) => {
  switch (filterType) {
    case 'search':
      return {
        ...filters,
        search: remove ? undefined : value,
      }
    case 'funder':
      return {
        ...filters,
        grants: {
          ...filters.grants,
          funders: {
            [LIST_LOGIC]: appendOrRemove(
              ((filters.grants && filters.grants.funders && filters.grants.funders[LIST_LOGIC]) || []),
              value,
              remove,
            )
          }
        },
      }
    case 'area':
      return {
        ...filters,
        areas: {
          [LIST_LOGIC]: appendOrRemove(
            ((filters.areas && filters.areas[LIST_LOGIC]) || []),
            value,
            remove,
          )
        },
      }
    case 'cause':
      return {
        ...filters,
        causes: {
          [LIST_LOGIC]: appendOrRemove(
            ((filters.causes && filters.causes[LIST_LOGIC]) || []),
            value,
            remove,
          )
        },
      }
    case 'operation':
      return {
        ...filters,
        operations: {
          [LIST_LOGIC]: appendOrRemove(
            ((filters.operations && filters.operations[LIST_LOGIC]) || []),
            value,
            remove,
          )
        },
      }
    case 'beneficiary':
      return {
        ...filters,
        beneficiaries: {
          [LIST_LOGIC]: appendOrRemove(
            ((filters.beneficiaries && filters.beneficiaries[LIST_LOGIC]) || []),
            value,
            remove,
          )
        },
      }
    case 'geo':
      return {
        ...filters,
        geo: remove ? {} : {
          boundingBox: value
        },
      }
    default:
      return filters
  }
}

export default reduceFilters
