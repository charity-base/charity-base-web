import { LIST_FILTERS } from '../../../lib/gql'

const writeFiltersCache = (filtersList, apolloClient) => {
  const sortedFilters = filtersList.sort((a, b) => a.id.localeCompare(b.id))
  const asyncFilters = sortedFilters.filter(({ filterType }) => {
    return ['search', 'geo'].indexOf(filterType) === -1
  })
  const variables = { ids: asyncFilters.map(x => x.id) }
  apolloClient.cache.writeQuery({
    query: LIST_FILTERS,
    variables,
    data: {
      CHC: {
        __typename: 'FilteredCharitiesCHC',
        getFilters: asyncFilters.map(({ id, value, label, filterType }) => ({
          id,
          value,
          label,
          filterType,
          __typename: 'FilterCHC',
        })),
      }
    },
  })
  return sortedFilters
}

export default writeFiltersCache
