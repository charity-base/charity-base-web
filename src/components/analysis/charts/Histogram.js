import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { formatCount, formatMoney } from '../../../lib/formatHelpers'

const CountMoneyHistogram = ({ data, width, height, rangeKey, countKey, moneyKey, xAxisLabel }) => (
  <BarChart
    width={width}
    height={height}
    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    data={data}
  >
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey={rangeKey} label={{ value: xAxisLabel, offset: -5, position: 'insideBottom' }} />
    <YAxis yAxisId='left' tickFormatter={formatCount} orientation='left' stroke='#64B5F6'/>
    <YAxis yAxisId='right' tickFormatter={formatMoney} orientation='right' stroke='#81C784'/>
    <Tooltip
      labelFormatter={x => <span style={{fontSize: '18px', fontWeight: 500}}>{x}</span>}
      formatter={(value, name) => `${name === countKey ? formatCount(value) : formatMoney(value)}`}
    />
    <Legend verticalAlign='middle' align='left' layout='vertical' height={36} />
    <Bar yAxisId='left' dataKey={countKey} fill='#64B5F6' />
    <Bar yAxisId='right' dataKey={moneyKey} fill='#81C784' />
  </BarChart>
)
CountMoneyHistogram.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  rangeKey: PropTypes.string,
  countKey: PropTypes.string,
  moneyKey: PropTypes.string,
  xAxisLabel: PropTypes.string,
}
CountMoneyHistogram.defaultProps = {
  width: 900,
  height: 300,
  rangeKey: 'name',
}
export { CountMoneyHistogram }
