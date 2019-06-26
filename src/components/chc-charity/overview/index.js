import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Tag, Typography } from 'antd'
import { ResponsiveScroll } from '../../general/Layout'
import Areas from './Areas'
import Contact from './Contact'
import Finances from './Finances'
import Names from './Names'
import OrgIds from './OrgIds'
import People from './People'
import Registrations from './Registrations'

const {
  Paragraph,
} = Typography

const cleanUrl = url => {
  if (!url) return null
  if (url.indexOf('https://') === 0) return url
  if (url.indexOf('http://') === 0) return url
  return `http://${url}`
}

const CharityOverview = ({
  activities,
  areas,
  beneficiaries,
  causes,
  contact,
  finances,
  grants,
  id,
  names,
  numPeople,
  operations,
  orgIds,
  registrations,
  website
}) => {
  const href = cleanUrl(website)
  return (
    <ResponsiveScroll style={{ backgroundColor: '#fafafa' }}>
      <Names names={names} />
      <OrgIds orgIds={orgIds} />
      <Registrations registrations={registrations} />
      <div style={{ marginBottom: '1em' }}>
        {href ? <a href={href}>{href}</a> : 'no website recorded'}
      </div>
      <Card bordered={false} style={{ marginBottom: '1em' }}>
        <Paragraph style={{ fontSize: '1.5em' }}>
          {activities ? `"${activities}"` : 'No description provided'}
        </Paragraph>
      </Card>
      <Row gutter={16} type='flex' justify='space-around' style={{ marginBottom: '1em' }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} offset={0} pull={0} push={0}>
          <Contact contact={contact} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} offset={0} pull={0} push={0}>
          <People numPeople={numPeople} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8} offset={0} pull={0} push={0}>
          <Finances finances={finances} grants={grants} id={id} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8} offset={0} pull={0} push={0}>
          <Areas areas={areas} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8} offset={0} pull={0} push={0}>
          <Card title='Themes' bordered={false} style={{ marginBottom: '2em' }}>
            <Paragraph>Causes:</Paragraph>
            {causes.map(x => (
              <Tag key={x.id}>{x.name}</Tag>
            ))}
            <Paragraph>Beneficiaries:</Paragraph>
            {beneficiaries.map(x => (
              <Tag key={x.id}>{x.name}</Tag>
            ))}
            <Paragraph>Operations:</Paragraph>
            {operations.map(x => (
              <Tag key={x.id}>{x.name}</Tag>
            ))}
          </Card>
        </Col>
      </Row>
    </ResponsiveScroll>
  )
}
CharityOverview.propTypes = {
  activities: PropTypes.string,
  areas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  beneficiaries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  causes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
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
  finances: PropTypes.arrayOf(PropTypes.shape({
    income: PropTypes.number.isRequired,
    spending: PropTypes.number.isRequired,
    financialYear: PropTypes.shape({
      end: PropTypes.string.isRequired,
    }),
  })),
  grants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fundingOrganization: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
    amountAwarded: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    awardDate: PropTypes.string.isRequired,
  })),
  id: PropTypes.string.isRequired,
  names: PropTypes.arrayOf(PropTypes.shape({
    primary: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  numPeople: PropTypes.shape({
    employees: PropTypes.number,
    trustees: PropTypes.number,
    volunteers: PropTypes.number,
  }),
  operations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  orgIds: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    rawId: PropTypes.string.isRequired,
    scheme: PropTypes.string.isRequired,
  })),
  registrations: PropTypes.arrayOf(PropTypes.shape({
    registrationDate: PropTypes.string.isRequired,
    removalDate: PropTypes.string,
    removalReason: PropTypes.string,
  })),
  website: PropTypes.string,
}

export default CharityOverview
