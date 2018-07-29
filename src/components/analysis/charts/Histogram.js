import React from 'react'
import PropTypes from 'prop-types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { formatCount, formatMoney } from '../../../lib/formatHelpers'

const IncomeChart = ({ data }) => (
  <BarChart width={900} height={300} data={data}
      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey='name' label={{ value: 'Charity Size', offset: -5, position: 'insideBottom' }} />
    <YAxis yAxisId='left' tickFormatter={x => formatCount(x)} orientation='left' stroke='#64B5F6'/>
    <YAxis yAxisId='right' tickFormatter={formatMoney} orientation='right' stroke='#81C784'/>
    <Tooltip labelFormatter={x => <div style={{fontSize: '18px', fontWeight: 500}}>{x}<hr/></div>} formatter={(value, name, props) => `${name[0] === '#' ? formatCount(value) : formatMoney(value)}`}/>
    <Legend verticalAlign='middle' align='left' layout='vertical' height={36} />
    <Bar yAxisId='left' dataKey='# Charities' fill='#64B5F6' />
    <Bar yAxisId='right' dataKey='Combined Charity Income' fill='#81C784' />
  </BarChart>
)
IncomeChart.propTypes = {
  data: PropTypes.array,
}

const GrantChart = ({ data }) => (
  <BarChart width={900} height={300} data={data}
      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey='name' label={{ value: 'Grant Size', offset: -5, position: 'insideBottom' }} />
    <YAxis yAxisId='left' tickFormatter={x => formatCount(x)} orientation='left' stroke='#64B5F6'/>
    <YAxis yAxisId='right' tickFormatter={formatMoney} orientation='right' stroke='#81C784'/>
    <Tooltip labelFormatter={x => <div style={{fontSize: '18px', fontWeight: 500}}>{x}<hr/></div>} formatter={(value, name, props) => `${name[0] === '#' ? formatCount(value) : formatMoney(value)}`}/>
    <Legend verticalAlign='middle' align='left' layout='vertical' height={36} />
    <Bar yAxisId='left' dataKey='# Grants' fill='#64B5F6' />
    <Bar yAxisId='right' dataKey='Combined Grant Value' fill='#81C784' />
  </BarChart>
)
IncomeChart.propTypes = {
  data: PropTypes.array,
}

const GrantDateChart = ({ data }) => (
  <BarChart width={900} height={300} data={data}
      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray='3 3'/>
    <XAxis dataKey='name' label={{ value: 'Date Grant Awarded', offset: -5, position: 'insideBottom' }} />
    <YAxis yAxisId='left' tickFormatter={x => formatCount(x)} orientation='left' stroke='#64B5F6'/>
    <YAxis yAxisId='right' tickFormatter={formatMoney} orientation='right' stroke='#81C784'/>
    <Tooltip labelFormatter={x => <div style={{fontSize: '18px', fontWeight: 500}}>{x}<hr/></div>} formatter={(value, name, props) => `${name[0] === '#' ? formatCount(value) : formatMoney(value)}`}/>
    <Legend verticalAlign='middle' align='left' layout='vertical' height={36} />
    <Bar yAxisId='left' dataKey='# Grants' fill='#64B5F6' />
    <Bar yAxisId='right' dataKey='Combined Grant Value' fill='#81C784' />
  </BarChart>
)
IncomeChart.propTypes = {
  data: PropTypes.array,
}

export { IncomeChart, GrantChart, GrantDateChart }
