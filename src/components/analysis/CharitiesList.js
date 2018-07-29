import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { Menu, Icon } from 'antd'
import { fetchJSON } from '../../lib/fetchHelpers'
import { apiEndpoint } from '../../lib/constants'
import { esBoundsToString, getCenterZoom } from '../../lib/mapHelpers'
import { causes, operations, beneficiaries, funders } from '../../lib/filterValues'
import { formatMoney } from '../../lib/formatHelpers'
import { CharitiesMap, FundersTreemap, CountMoneyHistogram, RadialChart } from './charts'


class CharitiesList extends Component {
  state = {
    loading: true,
    data: [],
    geoBounds: null,
    isFreshSearch: false,
    width: null,
    height: null,
    geoPrecision: null,
  }
  chartContainer = React.createRef()
  componentDidMount() {
    this.refreshSearch(this.props.queryString, null, null, true)
    this.setChartSize()
    if (!this.props.query.view) {
      this.setView('charity-location')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.queryString !== nextProps.queryString) {
      const allGeo = nextProps.query.addressWithin !== this.props.query.addressWithin
      const geoBounds = allGeo ? null : this.state.geoBounds
      const geoPrecision = allGeo ? null : this.state.geoPrecision
      this.refreshSearch(nextProps.queryString, geoBounds, geoPrecision, true)
    }
  }
  setView = view => {
    this.onQueryUpdate('view', view)
  }
  setChartSize = () => {
    this.setState({
      width: this.chartContainer.current.clientWidth - 182 - 48,
      height: 400,
    })
  }
  refreshSearch = (queryString, geoBounds, geoPrecision, isFreshSearch) => {
    this.setState({
      loading: true,
      data: [],
    })
    this.getData(queryString, geoBounds, geoPrecision, res => {
      const isBoundsInvalid = res.aggregations.addressLocation.map_zoom.bounds && res.aggregations.addressLocation.map_zoom.bounds.top_left.lat === res.aggregations.addressLocation.map_zoom.bounds.bottom_right.lat
      this.setState({
        data: res.aggregations,
        loading: false,
        isFreshSearch,
        ...(isBoundsInvalid ? {} : {geoBounds: esBoundsToString(res.aggregations.addressLocation.map_zoom.bounds)}),
        geoPrecision,
      })
    })
  }
  getData = (queryString, geoBounds, geoPrecision, callback) => {
    const qs = queryString ? queryString.split('?')[1] + '&' : ''
    const url = `${apiEndpoint}/aggregate-charities?${qs}hasGrant=true&aggGeoBounds=${geoBounds || ''}&aggGeoPrecision=${geoPrecision || ''}&aggGrantDateInterval=year`
    fetchJSON(url)
    .then(res => callback(res))
    .catch(err => console.log(err))
  }
  onQueryUpdate = (key, value) => {
    const newQuery = { ...this.props.query, [key]: value || undefined }
    this.context.router.history.push(`?${qs.stringify(newQuery)}`)
  }
  onBoundsChange = (geoBoundsString, geoPrecision) => {
    if (geoBoundsString !== this.state.geoBounds) {
      this.refreshSearch(this.props.queryString, geoBoundsString, geoPrecision, false)
    }
  }
  render() {
    const { loading, data } = this.state
    const { view } = this.props.query
    return (<div>
      <Menu
        onClick={e => this.setView(e.key)}
        selectedKeys={[view]}
        mode='horizontal'
      >
        <Menu.Item key='grant-size'>
          <span><Icon type='bank' />Grant Size</span>
        </Menu.Item>
        <Menu.Item key='grant-date'>
          <span><Icon type='calendar' />Grant Date</span>
        </Menu.Item>
        <Menu.Item key='grant-funders'>
          <span><Icon type='gift' />Grant Funders</span>
        </Menu.Item>
        <Menu.Item key='charity-location'>
          <span><Icon type='environment-o' />Recipient Location</span>
        </Menu.Item>
        <Menu.Item key='charity-size'>
          <span><Icon type='bank' />Recipient Size</span>
        </Menu.Item>
        <Menu.SubMenu title={<span><Icon type='down' />Recipient Tags</span>}>
          <Menu.Item key='charity-causes'>
            <span><Icon type='medicine-box' />Causes</span>
          </Menu.Item>
          <Menu.Item key='charity-beneficiaries'>
            <span><Icon type='team' />Beneficiaries</span>
          </Menu.Item>
          <Menu.Item key='charity-operations'>
            <span><Icon type='tool' />Operations</span>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
      <div
        ref={this.chartContainer}
      >
        {view === 'charity-size' && this.state.width && <div>{data.size && (
          <CountMoneyHistogram
            data={data.size.buckets.map(x => ({
              'name': `${formatMoney(Math.pow(10, x.key))} - ${formatMoney(Math.pow(10, x.key+0.5))}`,
              'Number of Charities': x.doc_count,
              'Combined Income': x.total_income.value,
            }))}
            width={this.state.width}
            height={this.state.height}
            rangeKey='name'
            countKey='Number of Charities'
            moneyKey='Combined Income'
            xAxisLabel='Charity Income'
          />
        )}</div>}
        {view === 'grant-size' && this.state.width && <div>{data.grantSize && (
          <CountMoneyHistogram
            data={data.grantSize.filtered_grants.grantSize.buckets.map(x => ({
              'name': `${formatMoney(Math.pow(10, x.key))} - ${formatMoney(Math.pow(10, x.key+0.5))}`,
              'Number of Grants': x.doc_count,
              'Combined Value': x.total_awarded.value,
            }))}
            width={this.state.width}
            height={this.state.height}
            rangeKey='name'
            countKey='Number of Grants'
            moneyKey='Combined Value'
            xAxisLabel='Grant Size'
          />
        )}</div>}
        {view === 'grant-date' && <div>{data.grantDate && (
          <CountMoneyHistogram
            data={data.grantDate.filtered_grants.grantDate.buckets.map(x => ({
              'name': `${x.key_as_string}`,
              'Number of Grants': x.doc_count,
              'Combined Value': x.total_awarded.value,
            }))}
            width={this.state.width}
            height={this.state.height}
            rangeKey='name'
            countKey='Number of Grants'
            moneyKey='Combined Value'
            xAxisLabel='Grant Date'
          />
        )}</div>}
        {view === 'charity-causes' && <div>{data.causes && (
          <RadialChart
            data={causes.filter(x => x.id !== 101 && x.id !== 117).sort((a,b) => a.id - b.id).map(x => ({
              name: `${x.altName}`,
              doc_count: (data.causes.buckets.find(c => c.key === x.id) || { doc_count: 0 }).doc_count,
            }))}
          />
        )}</div>}
        {view === 'charity-beneficiaries' && <div>{data.beneficiaries && (
          <RadialChart
            data={beneficiaries.filter(x => x.id !== 206).sort((a,b) => a.key - b.key).map(x => ({
              name: `${x.altName}`,
              doc_count: (data.beneficiaries.buckets.find(c => c.key === x.id) || { doc_count: 0 }).doc_count,
            }))}
          />
        )}</div>}
        {view === 'charity-operations' && <div>{data.operations && (
          <RadialChart
            data={operations.filter(x => x.id !== 310).sort((a,b) => a.key - b.key).map(x => ({
              name: `${x.altName}`,
              doc_count: (data.operations.buckets.find(c => c.key === x.id) || { doc_count: 0 }).doc_count,
            }))}
          />
        )}</div>}
        {view === 'grant-funders' && this.state.width && <div>{data.funders && (
          <FundersTreemap
            data={data.funders.filtered_grants.funders.buckets.map(x => ({
              id: x.key,
              name: `${(funders.find(f => f.id === x.key) || { name: 'Unknown' }).name}`,
              count: x.doc_count,
              totalAwarded: x.total_awarded.value,
              averageValue: x.total_awarded.value/x.doc_count,
            }))}
            width={this.state.width}
            height={this.state.height}
            onQueryUpdate={this.onQueryUpdate}
          />
        )}</div>}
        {view === 'charity-location' && this.state.width && (
          <CharitiesMap
            data={data.addressLocation ? data.addressLocation.grid.buckets : []}
            onBoundsChange={this.onBoundsChange}
            onQueryUpdate={this.onQueryUpdate}
            isGeoFilterApplied={this.props.query && this.props.query.addressWithin ? true : false}
            isFreshSearch={this.state.isFreshSearch}
            {...getCenterZoom(this.state.geoBounds, this.state.width, this.state.height)}
            width={this.state.width}
            height={this.state.height}
            loading={loading}
         />
        )}
      </div>
    </div>)
  }
}
CharitiesList.propTypes = {
  queryString: PropTypes.string,
  query: PropTypes.object,
}
CharitiesList.contextTypes = {
  router: PropTypes.object,
}

export { CharitiesList }
