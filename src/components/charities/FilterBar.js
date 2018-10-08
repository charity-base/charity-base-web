import React, { Component } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Divider, message } from 'antd'
import { DownloadResults } from '../general/download'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'
import charityBase from '../../lib/charityBaseClient'

class ResultsCount extends Component {
  state = {
    count: null,
    isLoading: false,
  }
  componentDidMount() {
    this.countResults(this.props.query)
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.queryString !== prevProps.queryString) {
      this.countResults(this.props.query)
    }
  }
  countResults = query => {
    this.setState({ isLoading: true })
    charityBase.charity.count({
      ...query,
      accessToken: localStorage.getItem('access_token'),
    })
    .then(res => this.setState({ isLoading: false, count: res.count }))
    .catch(e => message.error('Oops, something went wrong'))
  }
  formatCount = x => numeral(x).format('0,0')
  render() {
    const isValidCount = this.state.count !== null && !this.state.isLoading
    return (
      <div style={{ height: '30px', marginTop: '20px', textAlign: 'center' }}>
        {isValidCount && `${this.formatCount(this.state.count)} charities`}
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
