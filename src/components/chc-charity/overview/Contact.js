import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Card, Typography, Icon } from 'antd'

const { Paragraph } = Typography

const Contact = ({ contact }) => {
  return (
    <Card title='Contact' bordered={false} style={{ marginBottom: '2em' }}>
      {contact ? (
        <Fragment>
          <Paragraph>
            {contact.social.map((x, i) => {
              return (
                <a
                  key={i}
                  href={`https://${x.platform}.com/${x.handle}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ padding: '0.3em' }}
                >
                  <Icon type={x.platform} />
                </a>
              )
            })}
          </Paragraph>
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
    social: PropTypes.arrayOf(PropTypes.shape({
      platform: PropTypes.string.isRequired,
      handle: PropTypes.string.isRequired,
    })),
  }),
}

export default Contact
