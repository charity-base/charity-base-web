import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Typography } from 'antd'

const { Paragraph } = Typography

const Contact = ({ contact }) => {
  return (
    <Card title='Contact' bordered={false} style={{ marginBottom: '2em' }}>
      {contact ? (
        <Fragment>
          <Paragraph>{contact.email}</Paragraph>
          <Paragraph>{contact.phone}</Paragraph>
          <Paragraph>{[...contact.address, contact.postcode].join(', ')}</Paragraph>
        </Fragment>
      ) : 'No contact information provided'}
    </Card>
  )
}
Contact.propTypes = {
  contact: PropTypes.shape({
    address: PropTypes.arrayOf(PropTypes.string),
    email: PropTypes.string,
    phone: PropTypes.string,
    postcode: PropTypes.string,
  }),
}

export default Contact
