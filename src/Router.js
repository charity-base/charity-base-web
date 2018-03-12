import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Charities } from './components/charities'
import { Charity } from './components/charity'
import { FAQ } from './components/faq'

const Router = () => (
  <Switch>
    <Route exact path="/" render={({ location }) => (
      <Charities queryString={location.search} />
    )} />
    <Route path="/charities/:charityId" render={({ match }) => (
      <Charity charityId={match.params.charityId} />
    )} />
    <Route exact path="/faq" render={() => (
      <FAQ />
    )} />
    <Redirect to="/"/>
  </Switch>
)

export { Router };
