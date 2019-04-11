const removeFilter = (filtersList, filterItem) => {
  return filtersList.filter(x => x.id !== filterItem.id).sort((a, b) => a.primary.localeCompare(b.primary))
}

export default removeFilter
