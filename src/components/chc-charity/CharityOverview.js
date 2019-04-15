import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import { Card, Col, Row, Tag, Timeline, Typography } from 'antd'
import { ResponsiveScroll } from '../general/Layout'
import { Bar, BarChart, Tooltip } from 'recharts'

const {
  Paragraph,
  Title,
} = Typography

const formatPeople = x => numeral(x).format('0,000')
const formatCurrency = x => `£${numeral(x).format('0a')}`

const cleanUrl = url => {
  if (!url) return null
  if (url.indexOf('https://') === 0) return url
  if (url.indexOf('http://') === 0) return url
  return `http://${url}`
}

const OrgIdLink = ({ id, scheme, rawId }) => {
  switch(scheme) {
    case 'GB-CHC':
      return (
        <div>
          Charity Commission ID:
          <a href={`https://beta.charitycommission.gov.uk/charity-details/?regid=${rawId}`}>{id}</a>
        </div>
      )
    case 'GB-COH':
      return (
        <div>
          Companies House ID:
          <a href={`https://beta.companieshouse.gov.uk/company/${rawId}`}>{id}</a>
        </div>
      )
    default:
      return null
  }
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
  const sortedFinances = finances.sort((a, b) => (new Date(a.financialYear.end) - new Date(b.financialYear.end)))
  const sortedRegistrations = registrations.sort((a, b) => (new Date(a.registrationDate) - new Date(b.registrationDate)))
  const href = cleanUrl(website)
  return (
    <ResponsiveScroll style={{ backgroundColor: '#fafafa' }}>
      <Title level={3}>
        Also known as: {names.reduce((agg, x) => (x.primary ? agg : [...agg, x.value]), []).join(', ')}
      </Title>
      <div style={{ marginBottom: '1em' }}>
        {orgIds.map(x => (
          <OrgIdLink { ...x } />
        ))}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Timeline>
          {sortedRegistrations.map(x => (
            <Fragment
              key={x.registrationDate}
            >
              <Timeline.Item
                color='green'
              >
                Registered {x.registrationDate}
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
      <div style={{ marginBottom: '1em' }}>
        {href ? <a href={href}>{href}</a> : 'no website recorded'}
      </div>
      <Card bordered={false} style={{ marginBottom: '1em' }}>
        <Paragraph style={{ fontSize: '1.5em' }}>
          "{activities}"
        </Paragraph>
      </Card>
      <Row gutter={16} type='flex' justify='space-around' style={{ marginBottom: '1em' }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} offset={0} pull={0} push={0}>
          <Card title='Contact' bordered={false} style={{ marginBottom: '2em' }}>
            <Paragraph>{contact.email}</Paragraph>
            <Paragraph>{contact.phone}</Paragraph>
            <Paragraph>{[...contact.address, contact.postcode].join(', ')}</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} offset={0} pull={0} push={0}>
          <Card title='People' bordered={false} style={{ marginBottom: '2em' }}>
            <Paragraph>{formatPeople(numPeople.employees)} employees</Paragraph>
            <Paragraph>{formatPeople(numPeople.trustees)} trustees</Paragraph>
            <Paragraph>{formatPeople(numPeople.volunteers)} volunteers</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8} offset={0} pull={0} push={0}>
          <Card
            bordered={false}
            extra={<Link to={`/chc/${id}/finances`}>More</Link>}
            style={{ marginBottom: '2em' }}
            title='Finances'
          >
            <Paragraph>Latest Income: {formatCurrency(sortedFinances[sortedFinances.length - 1].income)}</Paragraph>
            <BarChart
              barCategoryGap={3}
              barGap={0}
              width={300}
              height={80}
              data={sortedFinances}
            >
              <Tooltip
                labelFormatter={i => `Year Ending: ${sortedFinances[i].financialYear.end.substring(0,10)}`}
                formatter={(value, dataKey) => ([
                  dataKey,
                  formatCurrency(value),
                ])}
                separator=' '
              />
              <Bar dataKey='income' fill='#8884d8' />
              <Bar dataKey='spending' fill='pink' />
            </BarChart>
            {grants && grants.length > 0 ? (
              <div>
                <Paragraph>
                  Received {grants.length} public grants totalling {formatCurrency(grants.reduce((agg, x) => (agg + x.amountAwarded), 0))} from:
                </Paragraph>
                <div>
                  {Array.from(new Set(grants.map(x => x.fundingOrganization[0]))).map(x => (
                    <Tag key={x.id}>{x.name}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={8} offset={0} pull={0} push={0}>
          <Card title='Areas' bordered={false} style={{ marginBottom: '2em' }}>
            <Paragraph>
              {areas.filter(x => x.id[0] === 'A').map(x => (
                <Tag key={x.id}>{x.name}</Tag>
              ))}
            </Paragraph>
            <Paragraph>{areas.filter(x => ['B', 'C'].indexOf(x.id[0]) > -1).length} local areas</Paragraph>
            <Paragraph>{areas.filter(x => x.id[0] === 'D').length} countries</Paragraph>
            <Paragraph>{areas.filter(x => x.id[0] === 'E').length} continents</Paragraph>
          </Card>
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
