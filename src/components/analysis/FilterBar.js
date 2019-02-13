import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, message } from 'antd'
import { DownloadResults } from '../general/download'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'
import { formatCount, formatMoney } from '../../lib/formatHelpers'
import charityBase from '../../lib/charityBaseClient'

class ResultsCount extends Component {
  state = {
    count: null,
    grantsCount: null,
    grantsValue: null,
    isLoading: false,
    isLoadingGrants: false,
  }
  componentDidMount() {
    this.countResults(this.props.query)
    this.countGrantsResults(this.props.query)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.queryString !== prevProps.queryString) {
      this.countResults(this.props.query)
      this.countGrantsResults(this.props.query)
    }
  }
  countResults = query => {
    this.setState({ isLoading: true })
    charityBase.charity.count({
      ...query,
      hasGrant: true,
      accessToken: localStorage.getItem('access_token'),
    })
    .then(res => this.setState({ isLoading: false, count: res.count }))
    .catch(e => {
      this.setState({ isLoading: false, count: null })
      message.error('Oops, something went wrong')
    })
  }
  countGrantsResults = query => {
    this.setState({ isLoadingGrants: true })
    charityBase.charity.aggregate({
      ...query,
      accessToken: localStorage.getItem('access_token'),
      hasGrant: true,
      aggTypes: 'grantTotal',
    })
    .then(res => this.setState({
      isLoadingGrants: false,
      grantsCount: res.aggregations.grantTotal.filtered_grants.doc_count,
      grantsValue: res.aggregations.grantTotal.filtered_grants.total_awarded.value
    }))
    .catch(e => {
      this.setState({ isLoadingGrants: false, grantsCount: null, grantsValue: null })
      message.error('Oops, something went wrong')
    })
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
  query: PropTypes.object,
}

const FilterBar = ({ queryString, query }) => (
  <div>
    <MenuBarHeader>
      <Filters queryString={queryString} />
      <Divider />
      <ResultsCount
        queryString={queryString}
        query={query}
      />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString}/></div>
    </MenuBarHeader>
  </div>
)
FilterBar.propTypes = {
  queryString: PropTypes.string,
  query: PropTypes.object,
}

export { FilterBar }
