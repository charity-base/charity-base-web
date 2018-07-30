import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { Icon } from 'antd'
import { AddFilter } from './AddFilter'
import { SideBarTitle } from '../../general/InfoText'

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
          <Icon type='filter' style={{ marginRight: '10px' }}/>
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
