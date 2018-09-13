import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import { DownloadResults } from '../general/download'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'
import { fetchJSON } from '../../lib/fetchHelpers'
import { apiEndpoint } from '../../lib/constants'
import { formatCount, formatMoney } from '../../lib/formatHelpers'

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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.queryString !== prevProps.queryString) {
      this.countResults(this.props.queryString)
      this.countGrantsResults(this.props.queryString)
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
    .then(res => this.setState({ isLoadingGrants: false, grantsCount: res.aggregations.grantTotal.filtered_grants.doc_count, grantsValue: res.aggregations.grantTotal.filtered_grants.total_awarded.value }))
    .catch(err => console.log(err))
  }
  render() {
    const isValidCount = this.state.count !== null && !this.state.isLoading
    const isValidGrantCount = this.state.grantsCount !== null && !this.state.isLoadingGrants
    return (
      <div style={{ height: '120px', marginTop: '20px', textAlign: 'center' }}>
        {isValidCount && <div>{formatCount(this.state.count)} charities</div>}
        {isValidGrantCount && <div>{formatCount(this.state.grantsCount)} grants</div>}
        {isValidGrantCount && <div>{formatMoney(this.state.grantsValue)} granted</div>}
        {isValidGrantCount && <div>{formatMoney(this.state.grantsValue/this.state.grantsCount)} average grant</div>}
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
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString} fileType='JSON' /></div>
    </MenuBarHeader>
  </div>
)
FilterBar.propTypes = {
  queryString: PropTypes.string,
}

export { FilterBar }
