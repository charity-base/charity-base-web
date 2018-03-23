import React, { Component } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'
import { DebounceInput } from 'react-debounce-input'

const charitySearchInputStyles = {
  width: '100%',
  borderWidth: '0 0 1px 0',
  outlineWidth: 0,
  borderColor: 'rgba(0,0,0,.3)',
  fontSize: '18px',
  padding: '3px',
  fontWeight: 300,
  color: 'rgba(0,0,0,.7)',
  marginBottom: '20px',
}

class CharitiesSearch extends Component {
  state = {
    query: this.props.query,
  }
  componentDidUpdate(prevProps, prevState) {
    if (qs.stringify(prevProps.query) !== qs.stringify(this.props.query)) {
      this.setState({ query: this.props.query })
    }
  }
  onChange = e => {
    const searchText = e.target.value
    const newQuery = { ...this.state.query, search: searchText || undefined }
    this.context.router.history.push(`?${qs.stringify(newQuery)}`)
  }
  render() {
    return (
      <DebounceInput
        style={charitySearchInputStyles}
        minLength={0}
        debounceTimeout={300}
        placeholder="Search charities"
        value={this.state.query.search || ''}
        onChange={this.onChange}
      />
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
