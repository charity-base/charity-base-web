import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharityBaseSearch from 'charity-base-search'
import getFiltersMeta from './getFiltersMeta'
import reduceFilters from './reduceFilters'

class CharitiesSearch extends Component {
  onSelect = ({ filterType, value }) => {
    if (filterType === 'id') {
      return this.context.router.history.push(`/charities/${value}`)
    }
    const filters = reduceFilters(
      this.props.filters,
      filterType,
      value,
    )
    this.props.setFilters(filters)
  }
  render() {
    return (
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CharityBaseSearch
          label='Filter by charity...'
          onSelect={this.onSelect}
          getFiltersMeta={getFiltersMeta}
        />
      </div>
    )
  }
}
CharitiesSearch.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
}
CharitiesSearch.contextTypes = {
  router: PropTypes.object,
}

export default CharitiesSearch
