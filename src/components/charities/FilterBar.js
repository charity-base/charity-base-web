import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag, Input, Tooltip, Icon } from 'antd'
import { DownloadResults } from './DownloadResults'

const SideBarContainer = styled.div`
  padding: 15px;
  border-right: solid rgba(0,0,0,0.1) 1px;
  height: 100%;
`

const SideBarTitle = styled.div`
  color: rgba(0,0,0,0.6);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
`

class AddFilter extends Component {
  state = {
    inputVisible: false,
    inputValue: '',
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    // this.setState({ inputValue: toString(e) });
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    this.props.onNewFilter(inputValue)
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  }
  saveInputRef = input => this.input = input
  render() {
    const { inputValue, inputVisible } = this.state;
    return (
      <div>
      {inputVisible && (
        <Input
          ref={this.saveInputRef}
          type="text"
          size="small"
          style={{ width: '100%' }}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={this.showInput}
          style={{ background: '#fff', borderStyle: 'dashed', width: '100%', textAlign: 'center' }}
        >
          <Icon type="plus" /> Add Filter
        </Tag>
      )}
      </div>
    )
  }
}
AddFilter.propTypes = {
  onNewFilter: PropTypes.func.isRequired,
}


const parseQueryString = queryString => (
  queryString.length > 1 ? [...new Set(queryString.split('?')[1].split('&'))].map((name, id) => ({ id, name })) : []
)

class FilterBar extends Component {
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
  handleClose = removedFilter => {
    const filters = this.state.filters.filter(x => x.id !== removedFilter.id)
    this.updateRoute(filters)
    // this.setState({ filters })
  }
  onNewFilter = inputValue => {
    const { filters } = this.state
    if (!inputValue) return
    if (filters.filter(x => x.name === inputValue).length > 0) return
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
    // todo: prevent adding existing filter?
    const newFilter = {id: maxId + 1, name: inputValue}
    const newFilters = [...filters, newFilter];
    this.updateRoute(newFilters)
    this.setState({
      filters: newFilters,
    });
  }
  render() {
    const { filters } = this.state;
    return (
      <SideBarContainer>
        <SideBarTitle>
          <Icon type="filter"/>
          FILTERS
        </SideBarTitle>
        {filters.length === 0 && (
          <div style={{textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: '12px'}}>no filters applied</div>
        )}
        {filters.map((filter, index) => {
          const isLongName = filter.name.length > 20;
          const filterElem = (
            <Tag closable afterClose={() => this.handleClose(filter)}>
              {isLongName ? `${filter.name.slice(0, 20)}...` : filter.name}
            </Tag>
          )
          return (
            <div
              style={{marginBottom: '10px'}}
              key={filter.name}
            >
              {isLongName ? <Tooltip title={filter.name}>{filterElem}</Tooltip> : filterElem}
            </div>
          )
        })}
        <div style={{ margin: '20px 0 20px 0' }}>
          <AddFilter onNewFilter={this.onNewFilter} />
          <div
            style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}
          >
            <DownloadResults queryString={this.props.queryString}/>
          </div>
        </div>
      </SideBarContainer>
    );
  }
}
FilterBar.contextTypes = {
  router: PropTypes.object,
}
FilterBar.propTypes = {
  queryString: PropTypes.string,
}

export { FilterBar }
