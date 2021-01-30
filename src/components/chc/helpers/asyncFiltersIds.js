const LIST_LOGIC = 'some'

const asyncFiltersIds = filtersObj => {
  const filtersListIds = []
  if (filtersObj.areas) {
    if (filtersObj.areas[LIST_LOGIC]) {
      filtersObj.areas[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`area-${x}`)
      })
    }
  }
  if (filtersObj.grants) {
    if (filtersObj.grants.funders && filtersObj.grants.funders[LIST_LOGIC]) {
      filtersObj.grants.funders[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`funder-${x}`)
      })
    }
  }
  if (filtersObj.causes) {
    if (filtersObj.causes[LIST_LOGIC]) {
      filtersObj.causes[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`cause-${x}`)
      })
    }
  }
  if (filtersObj.operations) {
    if (filtersObj.operations[LIST_LOGIC]) {
      filtersObj.operations[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`operation-${x}`)
      })
    }
  }
  if (filtersObj.beneficiaries) {
    if (filtersObj.beneficiaries[LIST_LOGIC]) {
      filtersObj.beneficiaries[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`beneficiary-${x}`)
      })
    }
  }
  if (filtersObj.trustees) {
    if (filtersObj.trustees[LIST_LOGIC]) {
      filtersObj.trustees[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`trustee-${x}`)
      })
    }
  }
  if (filtersObj.topics) {
    if (filtersObj.topics[LIST_LOGIC]) {
      filtersObj.topics[LIST_LOGIC].forEach(x => {
        filtersListIds.push(`topic-${x}`)
      })
    }
  }
  return filtersListIds.sort((a, b) => a.localeCompare(b))
}

export default asyncFiltersIds
