import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Typography } from 'antd'
import { ResponsiveScroll } from '../../general/Layout'
import FinancesTable from './FinancesTable'
import GrantsTable from './GrantsTable'

const {
  Title,
} = Typography

const CharityFinances = ({
  finances,
  grants,
}) => {
  const sortedGrants = grants.sort((a, b) => (new Date(a.awardDate) - new Date(b.awardDate)))
  const sortedFinances = finances.sort((a, b) => (new Date(a.financialYear.end) - new Date(b.financialYear.end)))
  return (
    <ResponsiveScroll style={{ backgroundColor: '#fafafa' }}>
      <Switch>
        <Route exact path='/chc/:id/finances' render={() => (
          <Fragment>
            <Title level={4}>Income and Spending</Title>
            <FinancesTable finances={sortedFinances} />
          </Fragment>
        )} />
        <Route exact path='/chc/:id/finances/grants' render={() => (
          <Fragment>
            <Title level={4}>Public Grants</Title>
            <GrantsTable grants={sortedGrants} />
          </Fragment>
        )} />
        <Redirect to='/chc/:id/finances' />
      </Switch>
    </ResponsiveScroll>
  )
}
CharityFinances.propTypes = {
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
}

export default CharityFinances
