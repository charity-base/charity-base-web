import numeral from 'numeral'

const formatCount = x => numeral(x).format('0,0')

const formatMoney = x => numeral(x).format('($0a)').replace('$', '£')

export { formatCount, formatMoney, }
