import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharityBaseSearch from 'charity-base-search'
import { mapItem } from '../helpers'
import { charityBaseApiKey, charityBaseGqlApiUri } from '../../../lib/constants'

class CharitiesSearch extends Component {
  onSelect = (item) => {
    if (item.filterType === 'id') {
      return this.context.router.history.push(`/chc/${item.value}`)
    }
    this.props.onAddFilter(item)
  }
  render() {
    return (
      <CharityBaseSearch
        apiKey={charityBaseApiKey}
        apiUrl={charityBaseGqlApiUri}
        label='Search by charity, funder, cause, area...'
        onSelect={this.onSelect}
        hideAcknowledgement
        mapItem={mapItem}
      />
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
