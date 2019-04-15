import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, Tag, Typography } from 'antd'

const {
  Paragraph,
} = Typography

const formatCurrency = x => `£${numeral(x).format('0a')}`

const Finances = ({ finances, grants, id }) => {
  const sortedFinances = finances ? finances.sort((a, b) => (new Date(a.financialYear.end) - new Date(b.financialYear.end))) : []
  return (
    <Card
      bordered={false}
      extra={<Link to={`/chc/${id}/finances`}>More</Link>}
      style={{ marginBottom: '2em' }}
      title='Finances'
    >
      {sortedFinances && sortedFinances.length > 0 ? (
        <Fragment>
          <Paragraph>Latest Income: {formatCurrency(sortedFinances[sortedFinances.length - 1].income)}</Paragraph>
          <ResponsiveContainer width='100%' height={100}>
            <BarChart
              barCategoryGap={3}
              barGap={0}
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
          </ResponsiveContainer>
        </Fragment>
      ) : (
        <div>
          No income or spending reported.
        </div>
      )}
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
      ) : (
        <div>
          No public grants found.
        </div>
      )}
    </Card>
  )
}
Finances.propTypes = {
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
}

export default Finances
