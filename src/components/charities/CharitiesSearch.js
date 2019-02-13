import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import CharityBaseSearch from 'charity-base-search'
import { charityBaseApiKey, charityBaseApiUri } from '../../lib/constants'

class CharitiesSearch extends Component {
  onSelect = (item, inputValue) => {
    if (item && item.type === 'charity') {
      this.context.router.history.push(`/charities/${item.ids['GB-CHC']}`)
      return
    }
    const newQuery = { ...this.props.query, search: inputValue || undefined }
    this.context.router.history.push(`?${qs.stringify(newQuery)}`)
  }
  render() {
    return (
      <div style={{ position: 'relative', zIndex: 1 }}>
        <CharityBaseSearch
          apiKey={charityBaseApiKey}
          baseUrl={charityBaseApiUri}
          label={null}
          placeholder="Search charities, places, activities, people..."
          onSelect={this.onSelect}
          value={this.props.query.search || ''}
          charityBaseQuery={this.props.query}
        />
      </div>
    )
  }
}
CharitiesSearch.propTypes = {
  query: PropTypes.object,
}
CharitiesSearch.contextTypes = {
  router: PropTypes.object,
}

export { CharitiesSearch }
