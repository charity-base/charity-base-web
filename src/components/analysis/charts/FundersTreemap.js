import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { lighten } from 'polished'
import { Menu, Button, Dropdown, Icon, Row, Col } from 'antd'
import { Tooltip, Treemap } from 'recharts'
import { formatMoney, formatCount } from '../../../lib/formatHelpers'


class SimpleTreemapContent extends Component {
  render() {
    const { x, y, width, height, index, name, selected } = this.props
    const isVeryBig = width > 300
    const isBig = !isVeryBig && width > 100
    const isMedium = !isVeryBig && !isBig && width > 50
    return (
      <g onClick={() => this.props.onSelect(index)} style={{ cursor: 'pointer' }}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: selected[index] ? lighten(0.1, '#EC407A') : '#EC407A',
            stroke: '#fff',
          }}
        />
        {
          name && width > 50 && height > 30 ?
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={16}
            fontWeight={100}
            stroke={null}
          >
            {isVeryBig && name}
            {isBig && name.substr(0, 10) + '...'}
            {isMedium && name.substr(0, 4) + '...'}
          </text>
          : null
        }
      </g>
    )
  }
}
SimpleTreemapContent.propTypes = {
  onSelect: PropTypes.func,
}



const SimpleTreemapTooltip = ({ name, count, totalAwarded, averageValue }) => (
  <div>
    <div>{name}</div>
    <div>Number of Grants: {formatCount(count)}</div>
    <div>Total Granted: {formatMoney(totalAwarded)}</div>
    <div>Average Grant: {formatMoney(averageValue)}</div>
  </div>
)


class FundersTreemap extends Component {
  state = {
    dataKey: 'totalAwarded',
    selected: {},
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data.length !== nextProps.data.length) {
      this.setState({ selected: {} })
    }
  }
  keyOptions = () => ({
    count: 'Number of Grants',
    totalAwarded: 'Total Granted',
    averageValue: 'Average Grant',
  })
  menu = () => (
    <Menu onClick={({ key }) => this.setState({ dataKey: key })}>
      {Object.keys(this.keyOptions()).map(key => (
        <Menu.Item key={key}>{this.keyOptions()[key]}</Menu.Item>
      ))}
    </Menu>
  )
  getSelectedFunderIds = selected => {
    const { data } = this.props
    return Object.keys(selected).reduce((agg, i) => (selected[i] ? [...agg, data[i].id] : agg), [])
  }
  onFundersFilter = selected => {
    this.setState({ selected: {} })
    const funderIds = this.getSelectedFunderIds(selected)
    const queryStringValue = funderIds.length > 0 ? funderIds.join(',') : undefined
    this.props.onQueryUpdate('funders', queryStringValue)
  }
  onFunderSelect = i => {
    this.setState(s => ({
      selected: {
        ...s.selected,
        [i]: !s.selected[i]
      }
    }))
  }
  render() {
    const { data, width, height } = this.props
    return (
      <div>
        <Row>
          <Col>Area represents:</Col>
          <Col>
            <Dropdown overlay={this.menu()} trigger={['click']} disabled={data.length < 2}>
              <a className="ant-dropdown-link" style={{ fontSize: '16px', margin: '24px' }}>{this.keyOptions()[this.state.dataKey]} <Icon type="down" /></a>
            </Dropdown>
          </Col>
        </Row>
        <Button
          onClick={() => this.onFundersFilter(this.state.selected)}
          disabled={this.getSelectedFunderIds(this.state.selected).length === 0}
          style={{ position: 'relative' }}
        >
          Filter selected funders
        </Button>
        <Button
          onClick={() => this.onFundersFilter({})}
          disabled={false}
          style={{ position: 'relative' }}
        >
          Clear funders filter
        </Button>
        <Treemap
          width={width}
          height={height}
          data={data}
          dataKey={this.state.dataKey}
          ratio={4/3}
          stroke='#fff'
          fill='#EC407A'
          isAnimationActive={false}
          content={<SimpleTreemapContent selected={this.state.selected} onSelect={this.onFunderSelect} />}
        >
          <Tooltip formatter={(value, name, props) => <SimpleTreemapTooltip {...props.payload} /> } separator='' />
        </Treemap>
      </div>
    )
  }
}
FundersTreemap.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
}

export { FundersTreemap }
