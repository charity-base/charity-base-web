import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tag, Input, Tooltip, Icon } from 'antd';

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

class FilterBar extends React.Component {
  state = {
    filters: this.props.queryString.length > 1 ? this.props.queryString.split('?')[1].split('&').map((name, id) => ({ id, name })) : [],
    inputVisible: false,
    inputValue: '',
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters.length !== this.state.filters.length) {
      this.context.router.history.push(`?${this.state.filters.map(x => x.name).join('&')}`)
    }
  }
  handleClose = removedFilter => {
    const filters = this.state.filters.filter(x => x.id !== removedFilter.id);
    this.setState({ filters });
  }
  addFilter = x => {
    const { filters } = this.state
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
    const newFilter = {id: maxId + 1, name: `Filter ${maxId + 1}`}
    this.setState({ filters: [...filters, newFilter ] })
    this.context.router.history.push('?search=red')
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    // this.setState({ inputValue: toString(e) });
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { filters, inputValue } = this.state
    if (!inputValue) return this.setState({ inputVisible: false })
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
    // todo: prevent adding existing filter?
    const newFilter = {id: maxId + 1, name: inputValue}
    const newFilters = [...filters, newFilter];
    this.setState({
      filters: newFilters,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input
  render() {
    const { filters, inputValue, inputVisible } = this.state;
    return (
      <SideBarContainer>
        <SideBarTitle>
          <Icon type="filter"/>
          FILTERS
        </SideBarTitle>
        {filters.map((filter, index) => {
          const isLongName = filter.name.length > 20;
          const filterElem = (
            <Tag key={filter.id} closable afterClose={() => this.handleClose(filter)}>
              {isLongName ? `${filter.name.slice(0, 20)}...` : filter.name}
            </Tag>
          );
          return isLongName ? <Tooltip title={filter.name} key={filter.id}>{filterElem}</Tooltip> : filterElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> Add Filter
          </Tag>
        )}
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
