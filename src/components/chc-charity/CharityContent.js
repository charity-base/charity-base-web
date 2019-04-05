import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Tag, Timeline, Typography } from 'antd'
import { ResponsiveScroll } from '../general/Layout'
import { Bar, BarChart } from 'recharts'

const {
  Paragraph,
  Title,
} = Typography

const formatPeople = x => numeral(x).format('0,000')
const formatCurrency = x => `£${numeral(x).format('0a')}`

const CharityContent = ({
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
  return (
    <ResponsiveScroll>
      <Title level={3}>
        Also known as: {names.reduce((agg, x) => (x.primary ? agg : [...agg, x.value]), []).join(', ')}
      </Title>
      <Paragraph>
        {activities}
      </Paragraph>
      <div style={{ marginBottom: '1em' }}>
        {orgIds.map(x => (
          <Tag key={x.id}>{x.id}</Tag>
        ))}
      </div>
      <div style={{ marginBottom: '1em' }}>
        {website ? <a href={website}>{website}</a> : 'no website recorded'}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Title level={4}>Contact</Title>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.address.join(', ')}</p>
        <p>{contact.postcode}</p>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Timeline>
          {registrations.sort((a, b) => (new Date(a.registrationDate) - new Date(b.registrationDate))).map(x => (
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
        <Title level={4}>People</Title>
        <div>{formatPeople(numPeople.employees)} employees</div>
        <div>{formatPeople(numPeople.trustees)} trustees</div>
        <div>{formatPeople(numPeople.volunteers)} volunteers</div>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Title level={4}>Finances</Title>
        <BarChart
          width={300}
          height={80}
          data={finances.sort((a, b) => (new Date(a.financialYear.end) - new Date(b.financialYear.end)))}
        >
          <Bar dataKey='income' fill='#8884d8' />
          <Bar dataKey='spending' fill='pink' />
        </BarChart>
        <div>
          Received {grants.length} public grants totalling {formatCurrency(grants.reduce((agg, x) => (agg + x.amountAwarded), 0))} from:
          <div>
            {Array.from(new Set(grants.map(x => x.fundingOrganization[0]))).map(x => (
              <Tag key={x.id}>{x.name}</Tag>
            ))}
          </div>
          <div>Insert link to grants table here</div>
        </div>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Title level={4}>Areas</Title>
        {areas.map(x => (
          <Tag key={x.id}>{x.name}</Tag>
        ))}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Title level={4}>Causes</Title>
        {causes.map(x => (
          <Tag key={x.id}>{x.name}</Tag>
        ))}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Title level={4}>Beneficiaries</Title>
        {beneficiaries.map(x => (
          <Tag key={x.id}>{x.name}</Tag>
        ))}
      </div>
      <div style={{ marginBottom: '1em' }}>
        <Title level={4}>Operations</Title>
        {operations.map(x => (
          <Tag key={x.id}>{x.name}</Tag>
        ))}
      </div>
    </ResponsiveScroll>
  )
}
CharityContent.propTypes = {
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

export default CharityContent
