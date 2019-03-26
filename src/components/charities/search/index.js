import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharityBaseSearch from 'charity-base-search'
import { mapItem } from '../helpers'

class CharitiesSearch extends Component {
  onSelect = (item) => {
    if (item.filterType === 'id') {
      return this.context.router.history.push(`/charities/${item.value}`)
    }
    this.props.onAddFilter(item)
  }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <CharityBaseSearch
          label='Search by charity, funder, cause, area...'
          onSelect={this.onSelect}
          mapItem={mapItem}
        />
      </div>
    )
  }
}
CharitiesSearch.propTypes = {
  onAddFilter: PropTypes.func.isRequired,
}
CharitiesSearch.contextTypes = {
  router: PropTypes.object,
}

export default CharitiesSearch
