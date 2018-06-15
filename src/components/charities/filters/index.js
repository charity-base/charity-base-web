import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { AddFilter } from './AddFilter'
import qs from 'query-string'

const SideBarTitle = styled.div`
  color: rgba(0,0,0,0.6);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
`

class Filters extends Component {
  state = {
    filters: qs.parse(this.props.queryString),
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryString !== this.props.queryString) {
      this.setState({ filters: qs.parse(this.props.queryString) })
    }
  }
  updateRoute = filters => {
    this.context.router.history.push(`?${qs.stringify(filters)}`)
  }
  render() {
    const { filters } = this.state
    return (
      <div>
        <SideBarTitle>
          <Icon type="filter"/>
          FILTERS
        </SideBarTitle>
        <AddFilter
          updateFilters={this.updateRoute}
          filters={filters}
        />
      </div>
    )
  }
}
Filters.contextTypes = {
  router: PropTypes.object,
}
Filters.propTypes = {
  queryString: PropTypes.string,
}

export { Filters }
