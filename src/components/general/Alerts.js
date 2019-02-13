import React from 'react'
import { Alert } from 'antd'

const Alerts = ({ alertsObjects }) => (
  alertsObjects.map(({ message, description, type }, i) => (
    <Alert
      key={i}
      message={message}
      description={description}
      type={type || 'info'}
      showIcon
      style={{ marginBottom: '10px' }}
    />
  ))
)

export { Alerts }
