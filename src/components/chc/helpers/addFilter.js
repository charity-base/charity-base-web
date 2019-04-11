const addFilter = (filtersList, filterItem) => {
  const stripped = filtersList.filter(x => x.id !== filterItem.id)
  return [...stripped, filterItem].sort((a, b) => a.primary.localeCompare(b.primary))
}

export default addFilter
