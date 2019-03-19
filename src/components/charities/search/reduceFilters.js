const LIST_LOGIC = 'some'

const reduceFilters = (filters, filterType, value) => {
  switch (filterType) {
    case 'search':
      return {
        ...filters,
        search: value,
      }
    case 'funder':
      return {
        ...filters,
        grants: {
          ...filters.grants,
          funders: {
            [LIST_LOGIC]: [
              ...((filters.grants && filters.grants.funders && filters.grants.funders[LIST_LOGIC]) || []),
              value,
            ]
          }
        },
      }
    case 'area':
      return {
        ...filters,
        areas: {
          [LIST_LOGIC]: [
            ...((filters.areas && filters.areas[LIST_LOGIC]) || []),
            value,
          ]
        },
      }
    case 'cause':
      return {
        ...filters,
        causes: {
          [LIST_LOGIC]: [
            ...((filters.causes && filters.causes[LIST_LOGIC]) || []),
            value,
          ]
        },
      }
    case 'operation':
      return {
        ...filters,
        operations: {
          [LIST_LOGIC]: [
            ...((filters.operations && filters.operations[LIST_LOGIC]) || []),
            value,
          ]
        },
      }
    case 'beneficiary':
      return {
        ...filters,
        beneficiaries: {
          [LIST_LOGIC]: [
            ...((filters.beneficiaries && filters.beneficiaries[LIST_LOGIC]) || []),
            value,
          ]
        },
      }
    default:
      return filters
  }
}

export default reduceFilters
