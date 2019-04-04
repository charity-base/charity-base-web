import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import CharitiesMap from './map'
import CharitiesIncome from './income'

const { TabPane } = Tabs

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
        <Tabs
          activeKey={view}
          onChange={x => setView(x)}
        >
          <TabPane tab="Map" key="map"></TabPane>
          <TabPane tab="Income" key="income"></TabPane>
        </Tabs>
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
