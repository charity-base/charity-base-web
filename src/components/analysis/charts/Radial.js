import React from 'react'
import PropTypes from 'prop-types'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'

const RadialChart = ({ data }) => (
  <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey='name' />
    <PolarRadiusAxis/>
    <Radar dataKey='doc_count' stroke='#EC407A' fill='#EC407A' fillOpacity={0.6}/>
  </RadarChart>
)
RadialChart.propTypes = {
  data: PropTypes.array,
}

export { RadialChart }
