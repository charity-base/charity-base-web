import React from 'react'
import PropTypes from 'prop-types'

const OrgIdLink = ({ id, scheme, rawId }) => {
  switch(scheme) {
    case 'GB-CHC':
      return (
        <div>
          Charity Commission ID:
          <a href={`https://beta.charitycommission.gov.uk/charity-details/?regid=${rawId}`}> {id}</a>
        </div>
      )
    case 'GB-COH':
      return (
        <div>
          Companies House ID:
          <a href={`https://beta.companieshouse.gov.uk/company/${rawId}`}> {id}</a>
        </div>
      )
    default:
      return null
  }
}
OrgIdLink.propTypes = {
  id: PropTypes.string.isRequired,
  rawId: PropTypes.string.isRequired,
  scheme: PropTypes.string.isRequired,
}

const OrgIds = ({ orgIds }) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      {orgIds.map(x => (
        <OrgIdLink
          key={x.id}
          { ...x }
        />
      ))}
    </div>
  )
}
OrgIds.propTypes = {
  orgIds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    rawId: PropTypes.string.isRequired,
    scheme: PropTypes.string.isRequired,
  })),
}

export default OrgIds
