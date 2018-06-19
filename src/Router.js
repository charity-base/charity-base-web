import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import qs from 'query-string'
import { Charities } from './components/charities'
import { Charity } from './components/charity'
import { FAQ } from './components/faq'

const Router = ({ isMobile }) => (
  <Switch>
    <Route exact path="/" render={({ location }) => (
      <Charities isMobile={isMobile} queryString={location.search} query={qs.parse(location.search)} />
    )} />
    <Route path="/charities/:charityId" render={({ match, location }) => (
      <Charity isMobile={isMobile} charityId={match.params.charityId} view={qs.parse(location.search).view} />
    )} />
    <Route exact path="/faq" render={() => (
      <FAQ isMobile={isMobile} />
    )} />
    <Redirect to="/"/>
  </Switch>
)
Router.propTypes = {
  isMobile: PropTypes.bool,
}

export { Router }
