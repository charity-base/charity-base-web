import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Divider } from 'antd'
import { DownloadResults } from '../general/DownloadResults'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'
import { fetchJSON } from '../../lib/fetchHelpers'
import { apiEndpoint } from '../../lib/constants'


class ResultsCount extends Component {
  state = {
    count: null,
    grantsCount: null,
    grantsValue: null,
    isLoading: false,
    isLoadingGrants: false,
  }
  componentDidMount() {
    this.countResults(this.props.queryString)
    this.countGrantsResults(this.props.queryString)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.queryString !== this.props.queryString) {
      this.countResults(nextProps.queryString)
      this.countGrantsResults(nextProps.queryString)
    }
  }
  countResults = queryString => {
    this.setState({ isLoading: true })
    const url = `${apiEndpoint}/count-charities${queryString}${queryString ? '&' : '?'}hasGrant=true`
    fetchJSON(url)
    .then(res => this.setState({ isLoading: false, count: res.count }))
    .catch(err => console.log(err))
  }
  countGrantsResults = queryString => {
    this.setState({ isLoadingGrants: true })
    const url = `${apiEndpoint}/aggregate-charities${queryString}${queryString ? '&' : '?'}hasGrant=true&aggTypes=grantTotal`
    fetchJSON(url)
    .then(res => console.log(res) || this.setState({ isLoadingGrants: false, grantsCount: res.aggregations.grantTotal.doc_count, grantsValue: res.aggregations.grantTotal.filtered_grants.total_awarded.value }))
    .catch(err => console.log(err))
  }
  formatCount = x => numeral(x).format('0,0')
  render() {
    const isValidCount = this.state.count !== null && !this.state.isLoading
    const isValidGrantCount = this.state.grantsCount !== null && !this.state.isLoadingGrants
    return (
      <div style={{ height: '120px', marginTop: '20px', textAlign: 'center' }}>
        {isValidCount && <div>{this.formatCount(this.state.count)} charities</div>}
        {isValidGrantCount && <div>{this.formatCount(this.state.grantsCount)} grants</div>}
        {isValidGrantCount && <div>{this.formatCount(this.state.grantsValue)} combined value</div>}
        {isValidGrantCount && <div>{this.formatCount(this.state.grantsValue/this.state.grantsCount)} avg grant value</div>}
      </div>
    )
  }
}
ResultsCount.propTypes = {
  queryString: PropTypes.string,
}

const FilterBar = ({ queryString }) => (
  <div>
    <MenuBarHeader>
      <Filters queryString={queryString} />
      <Divider />
      <ResultsCount
        queryString={queryString}
      />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString}/></div>
    </MenuBarHeader>
  </div>
)
FilterBar.propTypes = {
  queryString: PropTypes.string,
}

export { FilterBar }
