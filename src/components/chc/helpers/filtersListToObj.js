const LIST_LOGIC = 'some'

const filtersListToObj = filtersList => {
  const filterTypes = filtersList.reduce((agg, x) => ({
    ...agg,
    [x.filterType]: agg[x.filterType] ? [...agg[x.filterType], x] : [x],
  }), {})
  const filters = {}
  if (filterTypes.search) {
    filters.search = filterTypes.search[0].value
  }
  if (filterTypes.geo) {
    filters.geo = { boundingBox: filterTypes.geo[0].value }
  }
  if (filterTypes.area) {
    filters.areas = { [LIST_LOGIC]: filterTypes.area.map(x => x.value) }
  }
  if (filterTypes.funder) {
    filters.grants = { funders: { [LIST_LOGIC]: filterTypes.funder.map(x => x.value) } }
  }
  if (filterTypes.cause) {
    filters.causes = { [LIST_LOGIC]: filterTypes.cause.map(x => x.value) }
  }
  if (filterTypes.operation) {
    filters.operations = { [LIST_LOGIC]: filterTypes.operation.map(x => x.value) }
  }
  if (filterTypes.beneficiary) {
    filters.beneficiaries = { [LIST_LOGIC]: filterTypes.beneficiary.map(x => x.value) }
  }
  if (filterTypes.trustee) {
    filters.trustees = { [LIST_LOGIC]: filterTypes.trustee.map(x => x.value) }
  }
  if (filterTypes.topic) {
    filters.topics = { [LIST_LOGIC]: filterTypes.topic.map(x => x.value) }
  }
  return filters
}

export default filtersListToObj
