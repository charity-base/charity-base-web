import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { message } from 'antd'
import { esBoundsToString } from '../../lib/mapHelpers'
import { CharitiesMap, FundersTreemap, CharityCategoriesRadial, CharitySizeHistogram, GrantSizeHistogram, GrantDateHistogram } from './charts'
import charityBase from '../../lib/charityBaseClient'

class CharitiesList extends Component {
  state = {
    loading: true,
    data: [],
    geoBounds: null,
    isFreshSearch: false,
    geoPrecision: null,
  }
  componentDidMount() {
    this.refreshSearch(this.props.query, null, null, true)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.queryString !== this.props.queryString) {
      const allGeo = prevProps.query.addressWithin !== this.props.query.addressWithin
      const geoBounds = allGeo ? null : this.state.geoBounds
      const geoPrecision = allGeo ? null : this.state.geoPrecision
      this.refreshSearch(this.props.query, geoBounds, geoPrecision, true)
    }
  }
  getDateInterval = () => {
    const { grantDateRange } = this.props.query
    if (!grantDateRange || (grantDateRange.split(',').length !== 2)) {
      return 'year'
    }
    const [start, end] = grantDateRange.split(',').map(dateString => {
      const d = new Date(dateString)
      return 12*d.getFullYear() + d.getMonth()
    })
    const months = end - start
    return months > 24 ? 'year' : 'month'
  }
  setView = view => {
    this.props.onQueryUpdate('view', view)
  }
  refreshSearch = (query, geoBounds, geoPrecision, isFreshSearch) => {
    this.setState({
      loading: true,
      data: [],
    })
    this.getData(query, geoBounds, geoPrecision, res => {
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
  getData = (query, geoBounds, geoPrecision, callback) => {
    charityBase.charity.aggregate({
      ...query,
      accessToken: localStorage.getItem('access_token'),
      hasGrant: true,
      aggGeoBounds: geoBounds || '',
      aggGeoPrecision: geoPrecision || '',
      aggGrantDateInterval: this.getDateInterval(),
    })
    .then(callback)
    .catch(e => message.error('Oops, something went wrong'))
  }
  onBoundsChange = (geoBoundsString, geoPrecision) => {
    if (geoBoundsString !== this.state.geoBounds) {
      this.refreshSearch(this.props.query, geoBoundsString, geoPrecision, false)
    }
  }
  render() {
    const { loading, data } = this.state
    const { view, onQueryUpdate } = this.props
    return (
      <div>
        {view === 'charity-size' && (
          <CharitySizeHistogram
            buckets={data.size ? data.size.buckets : []}
          />
        )}
        {view === 'grant-size' && (
          <GrantSizeHistogram
            buckets={data.grantSize ? data.grantSize.filtered_grants.grantSize.buckets : []}
          />
        )}
        {view === 'grant-date' && (
          <GrantDateHistogram
            buckets={data.grantDate ? data.grantDate.filtered_grants.grantDate.buckets : []}
          />
        )}
        {view === 'charity-causes' && (
          <CharityCategoriesRadial
            buckets={data.causes ? data.causes.buckets : []}
            categoryType='causes'
          />
        )}
        {view === 'charity-beneficiaries' && (
          <CharityCategoriesRadial
            buckets={data.beneficiaries ? data.beneficiaries.buckets : []}
            categoryType='beneficiaries'
          />
        )}
        {view === 'charity-operations' && (
          <CharityCategoriesRadial
            buckets={data.operations ? data.operations.buckets : []}
            categoryType='operations'
          />
        )}
        {view === 'grant-topics' && (
          <CharityCategoriesRadial
            buckets={data.grantTopics ? data.grantTopics.filtered_grants.topics.nestedTopics.buckets : []}
            categoryType='grantTopics'
          />
        )}
        {view === 'grant-funders' && (
          <FundersTreemap
            buckets={data.funders ? data.funders.filtered_grants.funders.buckets : []}
            onQueryUpdate={onQueryUpdate}
          />
        )}
        {view === 'charity-location' && (
          <CharitiesMap
            buckets={data.addressLocation ? data.addressLocation.grid.buckets : []}
            onBoundsChange={this.onBoundsChange}
            onQueryUpdate={onQueryUpdate}
            isGeoFilterApplied={this.props.query && this.props.query.addressWithin ? true : false}
            isFreshSearch={this.state.isFreshSearch}
            geoBoundsString={this.state.geoBounds}
            loading={loading}
         />
        )}
      </div>
    )
  }
}
CharitiesList.propTypes = {
  queryString: PropTypes.string,
  query: PropTypes.object,
  view: PropTypes.string,
  onQueryUpdate: PropTypes.func,
}

export { CharitiesList }
