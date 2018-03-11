import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Charities } from './components/charities'
import { Charity } from './components/charity'

const Router = () => (
  <Switch>
    <Route exact path="/" render={({ location }) => (
      <Charities queryString={location.search} />
    )} />
    <Route path="/charities/:charityId" render={({ match }) => (
      <Charity charityId={match.params.charityId} />
    )} />
    <Redirect to="/"/>
  </Switch>
)

export { Router };
