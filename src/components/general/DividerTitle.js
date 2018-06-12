import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'antd'

const DividerTitle = ({ title }) => (
  <Divider
    dashed
    style={{ margin: '30px 0 30px 0' }}
  >
    <span style={{ fontWeight: 500, fontSize: '14px', }}>{title}</span>
  </Divider>
)
DividerTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export { DividerTitle }
