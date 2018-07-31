import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { lighten } from 'polished'
import { Menu, Button, Dropdown, Icon, Row, Col } from 'antd'
import { Tooltip, Treemap } from 'recharts'
import { formatMoney, formatCount } from '../../../lib/formatHelpers'
import { ContainerWidthConsumer } from '../../general/ContainerWidthConsumer'
import { Alerts } from '../../general/Alerts'
import { funders } from '../../../lib/filterValues'


class SimpleTreemapContent extends Component {
  render() {
    const { x, y, width, height, index, name, selected } = this.props
    const isVeryBig = width > 350
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
    dataKey: 'count',
    selected: {},
  }
  componentDidUpdate(prevProps) {
    if (prevProps.buckets.length !== this.props.buckets.length) {
      this.setState({ selected: {} })
    }
  }
  keyOptions = () => ({
    count: 'Number of Grants',
    averageValue: 'Average Grant Size',
    totalAwarded: 'Total Amount Granted',
  })
  menu = () => (
    <Menu onClick={({ key }) => this.setState({ dataKey: key })}>
      {Object.keys(this.keyOptions()).map(key => (
        <Menu.Item key={key}>{this.keyOptions()[key]}</Menu.Item>
      ))}
    </Menu>
  )
  getSelectedFunderIds = selected => {
    const { buckets } = this.props
    const data = this.getDataFromBuckets(buckets)
    return Object.keys(selected).reduce((agg, i) => (selected[i] && data[i] ? [...agg, data[i].id] : agg), [])
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
  getDataFromBuckets = buckets => buckets.map(x => ({
    id: x.key,
    name: `${(funders.find(f => f.id === x.key) || { name: 'Unknown' }).name}`,
    count: x.doc_count,
    totalAwarded: x.total_awarded.value,
    averageValue: x.total_awarded.value/x.doc_count,
  }))
  render() {
    const { buckets } = this.props
    const data = this.getDataFromBuckets(buckets)
    return (
      <Row type='flex' justify='center' align='middle' style={{ minHeight: 400 }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
          <Alerts
            alertsObjects={[
              {
                message: 'This chart shows the number of grants awarded by each funder as well as their average grant size and total amount granted.',
              },
              {
                message: `Remember it's interactive and will update based on the search and filters above, as well as any other filters added in the left hand sidebar.`,
              },
            ]}
          />
          <Row type='flex' justify='start' align='middle'>
            <Col xs={10} sm={8} md={8} lg={8} xl={6} xxl={9}>
              <span style={{ fontWeight: 500, fontSize: '16px' }} >Area represents:</span>
            </Col>
            <Col xs={14} sm={14} md={14} lg={12} xl={12} xxl={15}>
              <Dropdown overlay={this.menu()} trigger={['click']} disabled={data.length < 2}>
                <a className="ant-dropdown-link" style={{ fontSize: '16px', margin: '24px' }}>{this.keyOptions()[this.state.dataKey]} <Icon type="down" /></a>
              </Dropdown>
            </Col>
          </Row>
          <Button
            onClick={() => this.onFundersFilter(this.state.selected)}
            disabled={this.getSelectedFunderIds(this.state.selected).length === 0}
            style={{ position: 'relative' }}
            type='primary'
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
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
          <ContainerWidthConsumer>
            {width => (
              <Treemap
                width={width}
                height={400}
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
            )}
          </ContainerWidthConsumer>
        </Col>
      </Row>
    )
  }
}
FundersTreemap.propTypes = {
  buckets: PropTypes.array,
  onQueryUpdate: PropTypes.func,
}

export { FundersTreemap }
