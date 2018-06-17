import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numeral from 'numeral'
import { Divider } from 'antd'
import { DownloadResults } from '../general/DownloadResults'
import { CopyUrl } from '../general/CopyUrl'
import { MenuBarHeader } from '../general/MenuBar'
import { Filters } from './filters'
import { fetchJSON } from '../../lib/fetchHelpers'
import { apiEndpoint } from '../../lib/constants'

const SideBarContainer = styled.div`
  border-right: solid rgba(0,0,0,0.1) 1px;
  height: 100%;
`

class ResultsCount extends Component {
  state = {
    count: null,
    isLoading: false,
  }
  componentDidMount() {
    this.countResults(this.props.queryString)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.queryString !== this.props.queryString) {
      this.countResults(nextProps.queryString)
    }
  }
  countResults = queryString => {
    this.setState({ isLoading: true })
    const url = `${apiEndpoint}/count-charities${queryString}`
    fetchJSON(url)
    .then(res => this.setState({ isLoading: false, count: res.count }))
    .catch(err => console.log(err))
  }
  formatCount = x => numeral(x).format('0,0')
  render() {
    const isValidCount = this.state.count && !this.state.isLoading
    return (
      <div style={{ height: '30px', marginTop: '20px', textAlign: 'center' }}>
        {isValidCount && `${this.formatCount(this.state.count)} charities`}
      </div>
    )
  }
}
ResultsCount.propTypes = {
  queryString: PropTypes.string,
}

const FilterBar = ({ queryString }) => (
  <SideBarContainer>
    <MenuBarHeader>
      <Filters queryString={queryString} />
      <Divider />
      <ResultsCount
        queryString={queryString}
      />
      <div style={{ marginTop: '5px' }}><CopyUrl /></div>
      <div style={{ marginTop: '5px' }}><DownloadResults queryString={queryString}/></div>
    </MenuBarHeader>
  </SideBarContainer>
)
FilterBar.propTypes = {
  queryString: PropTypes.string,
}

export { FilterBar }
