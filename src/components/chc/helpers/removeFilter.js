const removeFilter = (filtersList, filterItem) => {
  return filtersList.filter(x => x.id !== filterItem.id).sort((a, b) => a.id.localeCompare(b.id))
}

export default removeFilter
