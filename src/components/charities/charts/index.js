import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'
import CharitiesMap from './map'
import CharitiesIncome from './income'

const { Group } = Radio

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
        top: 10,
        left: 40,
        zIndex: 999,
      }}>
        <Group
          onChange={e => setView(e.target.value)}
          value={view}
        >
          <Radio value='map'>Map</Radio>
          <Radio value='income'>Income</Radio>
        </Group>
      </div>
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
  )
}
CharitiesMap.propTypes = {
  filtersObj: PropTypes.object.isRequired,
  hoveredItem: PropTypes.object,
  onAddFilter: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
}

export default CharitiesChart
