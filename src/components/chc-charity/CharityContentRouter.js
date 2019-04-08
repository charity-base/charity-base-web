import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import CharityOverview from './CharityOverview'

const CharityContentRouter = ({ charity }) => {
  return (
    <Switch>
      <Route exact path='/chc/:id' render={() => (
        <CharityOverview {...charity} />
      )} />
      <Route exact path='/chc/:id/finances' render={() => (
        <div>charity finances table goes here</div>
      )} />
      <Redirect to='/chc/:id' />
    </Switch>
  )
}
CharityContentRouter.propTypes = {
  charity: PropTypes.object.isRequired,
}

export default CharityContentRouter
