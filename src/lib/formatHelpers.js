import numeral from 'numeral'

const formatCount = x => numeral(x).format('0,0')

const formatMoney = x => numeral(x).format('($0a)').replace('$', '£')

const stringifyQuery = (query, allowedKeys) => {

  const filterKey = k => allowedKeys.indexOf(k) > -1
  const filterValue = v => typeof v !== 'undefined'
  const parseValue = v => v === null ? '' : String(v)

  const queryString = Object.keys(query)
  .filter(filterKey)
  .filter(x => filterValue(query[x]))
  .sort()
  .map(x => `${x}=${parseValue(query[x])}`)
  .join('&')

  return queryString
}

export {
  formatCount,
  formatMoney,
  stringifyQuery,
}