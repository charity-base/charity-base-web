import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { List, Avatar, Button, Spin, } from 'antd'
import { fetchJSON } from '../../lib/fetchHelpers'
import { NoneText } from '../general/NoneText'
import { apiEndpoint } from '../../lib/constants'
import { causes, operations, beneficiaries, funders } from '../../lib/filterValues'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from 'recharts'

const formatMoney = x => numeral(x).format('($0a)').replace('$', '£')

const IncomeChart = ({ data }) => (
  <BarChart width={900} height={300} data={data}
      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis dataKey="name" label={{ value: 'Charity Size', offset: -5, position: 'insideBottom' }} />
    <YAxis yAxisId="left" tickFormatter={x => numeral(x).format('0,0')} orientation="left" stroke="#64B5F6"/>
    <YAxis yAxisId="right" tickFormatter={formatMoney} orientation="right" stroke="#81C784"/>
    <Tooltip labelFormatter={x => <div style={{fontSize: '18px', fontWeight: 500}}>{x}<hr/></div>} formatter={(value, name, props) => `${name[0] === '#' ? numeral(value).format('0,0') : formatMoney(value)}`}/>
    <Legend/>
    <Bar yAxisId="left" dataKey='# Charities' fill="#64B5F6" />
    <Bar yAxisId="left" dataKey='# Grants' fill="#1976D2" />
    <Bar yAxisId="right" dataKey="Total Income" fill="#81C784" />
    <Bar yAxisId="right" dataKey="Total Granted" fill="#388E3C" />
    {false && <Bar yAxisId="left" dataKey="avg_grant_value" fill="red" />}
  </BarChart>
)
IncomeChart.propTypes = {
  data: PropTypes.array,
}


const RadialCausesChart = ({ data }) => (
  <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="name" />
    <PolarRadiusAxis/>
    <Radar name="Mike" dataKey="doc_count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
  </RadarChart>
)
RadialCausesChart.propTypes = {
  data: PropTypes.array,
}


const SimpleTreemap = ({ data }) => (
  <Treemap
    width={400}
    height={200}
    data={data}
    dataKey="size"
    ratio={4/3}
    stroke="#fff"
    fill="#8884d8"
  >
    <Tooltip formatter={(value, name, props) => props.payload.name} separator='' />
  </Treemap>
)
SimpleTreemap.propTypes = {
  data: PropTypes.array,
}

const CausesChart = ({ data }) => (
  <BarChart width={900} height={300} data={data}
      margin={{top: 20, right: 30, left: 20, bottom: 5}}>
    <CartesianGrid strokeDasharray="3 3"/>
    <XAxis />
    <YAxis yAxisId="left" tickFormatter={x => numeral(x).format('0,0')} orientation="left" stroke="#64B5F6"/>
    <Tooltip/>
    <Legend/>
    <Bar yAxisId="left" dataKey='doc_count' fill="#64B5F6">
      <LabelList dataKey="name" position="insideTop" angle="-45"  />
    </Bar>
  </BarChart>
)
CausesChart.propTypes = {
  data: PropTypes.array,
}


const IncomeIcon = ({ income }) => (
  <svg style={{ width: '50px', height: '50px', }}>
    <circle
      cx='25px'
      cy='25px'
      fill='#EEE'
      r={2*Math.log10(income || 1)}
    />
    <line
      stroke='#EEE'
      strokeWidth="1"
      x1='0px'
      x2='25px'
      y1='25px'
      y2='25px'
    />
  </svg>
)
IncomeIcon.propTypes = {
  income: PropTypes.number,
}

const IncomeLabel = styled.span`
  height: 50px;
  line-height: 50px;
  vertical-align: top;
  font-size: 16px;
  margin-right: 5px;
  letter-spacing: 1px;
`

const Income = ({ income }) => (
  <div>
    <IncomeLabel>
      {numeral(income).format('($0a)').replace('$', '£')}
    </IncomeLabel>
    <IncomeIcon type='pay-circle' income={income} />
  </div>
)


class CharitiesList extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
    limit: 10,
    skip: 0,
  }
  componentDidMount() {
    this.refreshSearch(this.props.queryString)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.queryString !== nextProps.queryString) {
      this.refreshSearch(nextProps.queryString)
    }
  }
  refreshSearch = queryString => {
    this.setState({
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      limit: 10,
      skip: 0,
    })
    this.getData(queryString, 0, res => {
      this.setState({
        data: res.aggregations,
        loading: false,
        limit: res.query.size,
        skip: res.query.from + res.query.size,
      })
    })
  }
  getData = (queryString, skip, callback) => {
    const qs = queryString ? queryString.split('?')[1] + '&' : ''
    const url = `${apiEndpoint}/aggregate-charities?${qs}hasGrant=true`
    fetchJSON(url)
    .then(res => callback(res))
    .catch(err => console.log(err))
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData(this.props.queryString, this.state.skip, res => {
      const data = this.state.data.concat(res.aggregations)
      this.setState({
        data,
        loadingMore: false,
        limit: res.query.size,
        skip: res.query.from + res.query.size,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  render() {
    const { loading, loadingMore, showLoadingMore, data, limit } = this.state
    console.log(data.causes && data.causes.buckets.map(x => ({
            name: `${x.key}`,
            doc_count: x.doc_count,
          })))
    console.log(data.size && data.size.buckets.map(x => ({
      name: `${formatMoney(Math.pow(10, x.key))} - ${formatMoney(Math.pow(10, x.key+0.5))}`,
      '# Charities': x.doc_count,
      'Total Income': x.total_income.value,
      '# Grants': x.grants.filtered_grants.doc_count,
      'Total Granted': x.grants.filtered_grants.grants_sum.value,
          })))
    return (<div>
      <div>Location bins: {data.addressLocation && data.addressLocation.buckets.length}</div>
      <div>Size: {data.size && (
        <IncomeChart
          data={data.size.buckets.map(x => ({
            name: `${formatMoney(Math.pow(10, x.key))} - ${formatMoney(Math.pow(10, x.key+0.5))}`,
            '# Charities': x.doc_count,
            'Total Income': x.total_income.value,
            '# Grants': x.grants.filtered_grants.doc_count,
            'Total Granted': x.grants.filtered_grants.grants_sum.value,
            // avg_grant_value: x.total_granted.value/x.doc_count,
          }))}
        />
      )}</div>
      <div>Causes: {data.causes && (
        <RadialCausesChart
          data={causes.filter(x => x.id !== 101 && x.id !== 117).sort((a,b) => a.id - b.id).map(x => ({
            name: `${x.altName}`,
            doc_count: (data.causes.buckets.find(c => c.key === x.id) || { doc_count: 0 }).doc_count,
          }))}
        />
      )}</div>
      <div>Beneficiaries: {data.beneficiaries && (
        <RadialCausesChart
          data={beneficiaries.filter(x => x.id !== 206).sort((a,b) => a.key - b.key).map(x => ({
            name: `${x.altName}`,
            doc_count: (data.beneficiaries.buckets.find(c => c.key === x.id) || { doc_count: 0 }).doc_count,
          }))}
        />
      )}</div>
      <div>Operations: {data.operations && (
        <RadialCausesChart
          data={operations.filter(x => x.id !== 310).sort((a,b) => a.key - b.key).map(x => ({
            name: `${x.altName}`,
            doc_count: (data.operations.buckets.find(c => c.key === x.id) || { doc_count: 0 }).doc_count,
          }))}
        />
      )}</div>
      <div># Grants: {data.funders && (
        <SimpleTreemap
          data={data.funders.filtered_grants.funders.buckets.map(x => ({
            name: `${(funders.find(f => f.id === x.key) || { name: 'Unknown' }).name}`,
            size: x.doc_count,
            value: x.total_awarded.value,
            avg: x.total_awarded.value/x.doc_count,
          }))}
        />
      )}</div>
    </div>)
  }
}
CharitiesList.propTypes = {
  queryString: PropTypes.string,
}

export { CharitiesList }
