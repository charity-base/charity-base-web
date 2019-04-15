import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Timeline } from 'antd'

const Registrations = ({ registrations }) => {
  if (!registrations || !registrations.length) {
    return (
      <div style={{ marginBottom: '1em' }}>
        Could not find registration date.
      </div>
    )
  }
  const sortedRegistrations = registrations.sort((a, b) => (new Date(a.registrationDate) - new Date(b.registrationDate)))
  return (
    <div style={{ marginBottom: '1em' }}>
      <Timeline>
        {sortedRegistrations.map(x => (
          <Fragment
            key={x.registrationDate}
          >
            <Timeline.Item
              color='green'
            >
              Registered {x.registrationDate.substring(0,10)}
            </Timeline.Item>
            {x.removalDate ? (
              <Timeline.Item
                color='red'
              >
                <p>Deregistered {x.removalDate}</p>
                <p>Reason: {x.removalReason}</p>
              </Timeline.Item>
            ) : null}
          </Fragment>
        ))}
      </Timeline>
    </div>
  )
}
Registrations.propTypes = {
  registrations: PropTypes.arrayOf(PropTypes.shape({
    registrationDate: PropTypes.string.isRequired,
    removalDate: PropTypes.string,
    removalReason: PropTypes.string,
  })),
}

export default Registrations
