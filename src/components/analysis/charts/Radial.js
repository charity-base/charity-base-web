import React from 'react'
import PropTypes from 'prop-types'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'

const RadialChart = ({ data, width, height }) => (
  <RadarChart cx={width/2} cy={height/2} outerRadius={Math.min(width/2 - 50, 150)} width={width} height={height} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey='name' />
    <PolarRadiusAxis/>
    <Radar dataKey='doc_count' stroke='#EC407A' fill='#EC407A' fillOpacity={0.6}/>
  </RadarChart>
)
RadialChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
}

export { RadialChart }
