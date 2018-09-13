import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const Selector = ({ value, options, onChange }) => (
  <Select
    style={{ width: 120 }}
    value={value}
    onChange={onChange}
  >
    {options.map((x, i) => (
      <Select.Option
        key={i}
        value={x}
      >
        {x}
      </Select.Option>
    ))}
  </Select>
)
Selector.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Selector
