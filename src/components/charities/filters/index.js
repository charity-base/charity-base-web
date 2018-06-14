import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { AddFilter } from './AddFilter'

const SideBarTitle = styled.div`
  color: rgba(0,0,0,0.6);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
`

const parseQueryString = queryString => (
  queryString.length > 1 ? [...new Set(queryString.split('?')[1].split('&'))].map((name, id) => ({ id, name })) : []
)

class Filters extends Component {
  state = {
    filters: parseQueryString(this.props.queryString),
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.queryString !== this.props.queryString) {
      this.setState({ filters: parseQueryString(this.props.queryString) })
    }
  }
  updateRoute = filters => {
    this.context.router.history.push(`?${filters.map(x => x.name).join('&')}`)
  }
  updateFilters = filters => {
    this.updateRoute(filters)
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
          updateFilters={this.updateFilters}
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
