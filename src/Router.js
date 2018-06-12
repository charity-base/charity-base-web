import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import qs from 'query-string'
import { Charities } from './components/charities'
import { Charity } from './components/charity'
import { FAQ } from './components/faq'

const Router = () => (
  <Switch>
    <Route exact path="/" render={({ location }) => (
      <Charities queryString={location.search} query={qs.parse(location.search)} />
    )} />
    <Route path="/charities/:charityId" render={({ match, location }) => (
      <Charity charityId={match.params.charityId} view={qs.parse(location.search).view} />
    )} />
    <Route exact path="/faq" render={() => (
      <FAQ />
    )} />
    <Redirect to="/"/>
  </Switch>
)

export { Router }
