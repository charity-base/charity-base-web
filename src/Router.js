import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home'
import CHC from './components/chc'
import Charity from './components/chc-charity'
import { About } from './components/about'
import ApiPortal from './components/api-portal'

const Router = ({ isMobile }) => (
  <React.Fragment>
    <Route path="/" render={({ location }) => {
      if (typeof window.ga === 'function') {
        const path = location.pathname + location.search
        window.ga('gtag_UA_134443576_1.set', 'page', path)
        window.ga('gtag_UA_134443576_1.send', 'pageview')
      }
      return null
    }} />
    <Switch>
      <Route exact path="/" render={() => (
        <Home />
      )} />
      <Route exact path="/chc" render={() => (
        <CHC />
      )} />
      <Route path="/chc/:id" render={({ match }) => (
        <Charity id={match.params.id} />
      )} />
      <Route exact path="/about" render={() => (
        <About isMobile={isMobile} />
      )} />
      <Route path="/api-portal" render={() => (
        <ApiPortal isMobile={isMobile} />
      )} />
      <Route exact path="/api-explorer" render={() => (
        <Redirect to="/api-portal/playground"/>
      )} />
      <Route exact path="/a2fv1" render={() => (
        <Redirect to="/?funders=360G-blf&incomeRange=1%2C100000&addressWithin=20km%2C53.404361%2C-2.979554&causes.id=102"/>
      )} />
      <Redirect to="/"/>
    </Switch>
  </React.Fragment>
)
Router.propTypes = {
  isMobile: PropTypes.bool,
}

export default Router
