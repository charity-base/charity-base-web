import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Card, Typography } from 'antd'

const { Paragraph } = Typography

const formatPeople = x => numeral(x).format('0,000')

const People = ({ numPeople }) => {
  return (
    <Card title='People' bordered={false} style={{ marginBottom: '2em' }}>
      {numPeople ? (
        <Fragment>
          <Paragraph>{formatPeople(numPeople.employees)} employees</Paragraph>
          <Paragraph>{formatPeople(numPeople.trustees)} trustees</Paragraph>
          <Paragraph>{formatPeople(numPeople.volunteers)} volunteers</Paragraph>
        </Fragment>
      ) : 'No people recorded'}
    </Card>
  )
}
People.propTypes = {
  numPeople: PropTypes.shape({
    employees: PropTypes.number,
    trustees: PropTypes.number,
    volunteers: PropTypes.number,
  }),
}

export default People
