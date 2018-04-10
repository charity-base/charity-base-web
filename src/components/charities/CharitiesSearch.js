import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import qs from 'query-string'
import { DebounceInput } from 'react-debounce-input'

const SearchInputContainer = styled.div`
  margin-bottom: 20px;
  background-color: #FAFAFA;
  border-color: #F8BBD0;
  border-style: solid;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
`

const SearchInput = styled(DebounceInput)`
  width: 100%;
  border-width: 0;
  outline-width: 0;
  font-size: 18px;
  padding: 3px;
  font-weight: 300;
  background-color: inherit;
  color: rgba(0,0,0,.7);
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
          type="search"
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
