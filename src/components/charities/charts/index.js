import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, Select, Typography } from 'antd'
import CharitiesMap from './map'
import CharitiesIncome from './income'

const { Option } = Select
const { Title } = Typography

const HEADER_HEIGHT = '5em'

const CharitiesChart = ({ filtersObj, hoveredItem, onAddFilter, onRemoveFilter }) => {
  const [view, setView] = useState('map')
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: '1em',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
      }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          <Icon type='bar-chart' />
          <span style={{
            marginLeft: '1em',
          }}>
            Aggregations
          </span>
        </Title>
        <Select
          onChange={x => setView(x)}
          value={view}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 110,
          }}
          size='large'
        >
          <Option value='map'>Map</Option>
          <Option value='income'>Income</Option>
        </Select>
      </div>
      <div
        style={{
          position: 'absolute',
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
      {view === 'map' ? (
        <CharitiesMap
          filtersObj={filtersObj}
          hoveredItem={hoveredItem}
          onAddFilter={onAddFilter}
          onRemoveFilter={onRemoveFilter}
        />
      ) : null}
      {view === 'income' ? (
        <CharitiesIncome
          filtersObj={filtersObj}
        />
      ) : null}
      </div>
    </div>
  )
}
CharitiesMap.propTypes = {
  filtersObj: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}

export default CharitiesChart
