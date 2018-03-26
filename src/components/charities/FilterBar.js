import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import numeral from 'numeral'
import { Tag, Tooltip, Icon, Cascader } from 'antd'
import { DownloadResults } from './DownloadResults'
import { areasOfOperation, categories, beneficiaries, operations } from '../../lib/filterValues'

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


const options = [{
  value: 'income.latest.total',
  label: 'Income',
  children: [{
    value: '>',
    label: 'greater than',
    children: [...Array(10).keys()].map(x => 10**x).map(value => ({ value, label: numeral(value).format('($0a)').replace('$', '£') })),
  }, {
    value: '<',
    label: 'less than',
    children: [...Array(10).keys()].map(x => 10**x).map(value => ({ value, label: numeral(value).format('($0a)').replace('$', '£') })),
  }],
}, {
  value: 'isSchool=true',
  label: 'Is a school'
}, {
  value: 'areasOfOperation.name=',
  label: 'Operates in',
  children: [...new Set(areasOfOperation)].map(value => ({ value, label: value })),
}, {
  value: 'categories.name=',
  label: 'Type of work',
  children: categories.map(x => ({ value: x.name, label: x.name })),
}, {
  value: 'beneficiaries.name=',
  label: 'Beneficiaries',
  children: beneficiaries.map(x => ({ value: x.name, label: x.name })),
}, {
  value: 'operations.name=',
  label: 'Operations',
  children: operations.map(x => ({ value: x.name, label: x.name })),
}, {
  value: 'trustees.',
  label: '# Trustees',
  children: [{
    value: 'names.',
    label: 'at least',
    children: [...Array(300).keys()].map(value => ({ value, label: `${value + 1}` })),
  }, {
    value: '(!negate)names.',
    label: 'fewer than',
    children: [...Array(300).keys()].map(value => ({ value, label: `${value + 1}` })),
  }],
}, {
  value: 'subsidiaries.',
  label: '# Subsidiaries',
  children: [{
    value: '',
    label: 'at least',
    children: [...Array(300).keys()].map(value => ({ value, label: `${value + 1}` })),
  }, {
    value: '(!negate)',
    label: 'fewer than',
    children: [...Array(300).keys()].map(value => ({ value, label: `${value + 1}` })),
  }],
}, {
  value: 'trustees.incorporated=true',
  label: 'Trustees incorporated',
}]



class AddFilter extends Component {
  state = {
    inputVisible: false,
  }
  handleInputConfirm = values => {
    const rawString = values.join('')
    const filterString = this.isSubstring(rawString, '(!negate)') ? `!${rawString.replace(/\(!negate\)/g, '')}` : rawString
    this.props.onNewFilter(filterString)
    this.setState({ inputVisible: false })
  }
  isSubstring = (long, short) => (long.indexOf(short) > -1)
  searchOptions = (search, path) => {
    const searchTerms = search.trim().split(' ')
    const totalValuePath = path.map(x => x.value).join('')
    const totalLabelPath = path.map(x => x.label).join('')
    const totalPath = `${totalValuePath} ${totalLabelPath}`
    return searchTerms && searchTerms.reduce((agg, term) => agg && this.isSubstring(totalPath.toLowerCase(), term.toLowerCase()), true)
  }
  renderSearchResults = (search, path) => {
    const totalPath = path.map(x => x.label).join(' ')
    return (<div key={totalPath}>{totalPath}</div>)
  }
  render() {
    const { inputVisible } = this.state;
    return (
      <div>
        <Cascader
          size='small'
          style={{ width: '100%' }}
          expandTrigger='hover'
          options={options}
          onChange={this.handleInputConfirm}
          showSearch={{ filter: this.searchOptions, matchInputWidth: false, render: this.renderSearchResults }}
          value={[]}
          placeholder=''
          displayRender={inputVisible ? undefined : () => <div style={{textAlign: 'center'}}><Icon type='plus'/> Add Filter</div>}
          onPopupVisibleChange={isOpen => this.setState({ inputVisible: isOpen })}
          allowClear={false}
        />
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
  }
  onNewFilter = inputValue => {
    const { filters } = this.state
    if (!inputValue) return
    if (filters.filter(x => x.name === inputValue).length > 0) return
    const maxId = filters.reduce((agg, x) => x.id > agg ? x.id : agg, 0)
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
