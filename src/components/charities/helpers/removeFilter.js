const removeFilter = (filtersList, filterItem) => {
  return filtersList.filter(x => x.id !== filterItem.id)
}

export default removeFilter
