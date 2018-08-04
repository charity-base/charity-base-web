import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import qs from 'query-string'
import { Charities } from './components/charities'
import { Charity } from './components/charity'
import { About } from './components/about'
import { Analysis as AnalysisComp } from './components/analysis-comp'
import { Analysis } from './components/analysis'

const Router = ({ isMobile }) => (
  <Switch>
    <Route exact path="/" render={({ location }) => (
      <Charities isMobile={isMobile} queryString={location.search} query={qs.parse(location.search)} />
    )} />
    <Route path="/charities/:charityId" render={({ match, location }) => (
      <Charity isMobile={isMobile} charityId={match.params.charityId} view={qs.parse(location.search).view} />
    )} />
    <Route exact path="/about" render={() => (
      <About isMobile={isMobile} />
    )} />
    <Route exact path="/analysis" render={({ location }) => {
      const query = qs.parse(location.search)
      if (query.frozen === '2018-07-31') {
        return <AnalysisComp isMobile={isMobile} queryString={location.search} query={query} />
      }
      if (query.frozen) {
        return <Redirect to="/analysis" />
      }
      return <Analysis isMobile={isMobile} queryString={location.search} query={query} />
    }} />
    <Route exact path="/a2fv1" render={() => (
      <Redirect to="/?funders=360G-blf&incomeRange=1%2C100000&addressWithin=20km%2C53.404361%2C-2.979554&causes.id=102"/>
    )} />
    <Redirect to="/"/>
  </Switch>
)
Router.propTypes = {
  isMobile: PropTypes.bool,
}

export { Router }
