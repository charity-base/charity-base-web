import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from 'antd'

const { Title } = Typography

const Names = ({ names }) => {
  if (!names) return null
  const workingNames = names.reduce((agg, x) => (x.primary ? agg : [...agg, x.value]), [])
  if (!workingNames || !workingNames.length) return null
  return (
    <Title level={3}>
      Also known as: {workingNames.join(', ')}
    </Title>
  )
}
Names.propTypes = {
  names: PropTypes.arrayOf(PropTypes.shape({
    primary: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  })),
}

export default Names
