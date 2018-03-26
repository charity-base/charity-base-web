import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import qs from 'query-string'
import { DebounceInput } from 'react-debounce-input'

const SearchInputContainer = styled.div`
  margin-bottom: 20px;
  background-color: #F4F4F4;
  padding: 10px;
  border-radius: 10px;
`

const SearchInput = styled(DebounceInput)`
  width: 100%;
  border-width: 0 0 1px 0;
  outline-width: 0;
  border-color: rgba(0,0,0,.3);
  font-size: 18px;
  padding: 3px;
  font-weight: 300;
  color: rgba(0,0,0,.7);
  background-color: inherit;
  ::placeholder {
    color: rgba(0,0,0,.4);
  }
`

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
      <SearchInputContainer>
        <SearchInput
          minLength={0}
          debounceTimeout={300}
          placeholder="Search charities"
          value={this.state.query.search || ''}
          onChange={this.onChange}
        />
      </SearchInputContainer>
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
