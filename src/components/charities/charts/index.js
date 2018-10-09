import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharitiesMap from './map'

class CharitiesChart extends Component {
  render() {
    const { query, queryString } = this.props
    return (
      <CharitiesMap query={query} queryString={queryString} />
    )
  }
}
CharitiesChart.propTypes = {
  query: PropTypes.object.isRequired,
  queryString: PropTypes.string.isRequired,
}

export default CharitiesChart