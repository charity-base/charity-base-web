import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Charities } from './components/charities'

const Router = () => (
  <Switch>
    <Route exact path="/" render={({ location }) => (
      <Charities queryString={location.search} />
    )} />
    <Redirect to="/"/>
  </Switch>
)

export { Router };
