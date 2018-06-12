import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Tag, Tooltip, Icon } from 'antd'
import { AddFilter } from './AddFilter'

const SideBarTitle = styled.div`
  color: rgba(0,0,0,0.6);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 20px;
`

const parseQueryString = queryString => (
  queryString.length > 1 ? [...new Set(queryString.split('?')[1].split('&'))].map((name, id) => ({ id, name })) : []
)

class Filters extends Component {
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
  }
  onNewFilter = inputValue => {
    const { filters } = this.state
    if (!inputValue) return
    if (filters.filter(x => x.name === inputValue).length > 0) return
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
    const newFilter = {id: maxId + 1, name: inputValue}
    const newFilters = [...filters, newFilter];
    this.updateRoute(newFilters)
  }
  render() {
    const { filters } = this.state;
    return (
      <div>
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
        </div>
      </div>
    )
  }
}
Filters.contextTypes = {
  router: PropTypes.object,
}
Filters.propTypes = {
  queryString: PropTypes.string,
}

export { Filters }
