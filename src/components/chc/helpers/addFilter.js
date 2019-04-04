const addFilter = (filtersList, filterItem) => {
  const stripped = filtersList.filter(x => x.id !== filterItem.id)
  return [...stripped, filterItem]
}

export default addFilter
