import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import qs from 'query-string'
import About from './components/about'
import ApiPortal from './components/api-portal'
import CharityCHC from './components/chc-charity'
import Home from './components/home'
import SearchCHC from './components/chc'

const Router = ({ isMobile }, { router }) => (
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
      <Route exact path="/chc" render={({ location }) => {
        const queryObj = qs.parse(location.search)
        return (
          <SearchCHC
            filtersString={queryObj.filters}
            onChange={({ filters }) => {
              const queryString = qs.stringify({
                ...queryObj,
                filters,
              })
              return router.history.push(`/chc?${queryString}`)
            }}
          />
        )
      }} />
      <Route path="/chc/:id" render={({ match }) => (
        <CharityCHC id={match.params.id} />
      )} />
      <Route exact path="/about/:questionId?" render={({ match }) => (
        <About questionId={match.params.questionId} />
      )} />
      <Route path="/api-portal" render={() => (
        <ApiPortal />
      )} />
      <Route exact path="/api-explorer" render={() => (
        <Redirect to="/api-portal/playground"/>
      )} />
      <Route exact path="/a2fv1" render={() => (
        <Redirect to="/?funders=360G-blf&incomeRange=1%2C100000&addressWithin=20km%2C53.404361%2C-2.979554&causes.id=102"/>
      )} />
      <Route path="/charities/:id" render={({ match }) => (
        <Redirect to={`/chc/${match.params.id}`} />
      )} />
      <Redirect to="/"/>
    </Switch>
  </React.Fragment>
)
Router.propTypes = {
  isMobile: PropTypes.bool,
}
Router.contextTypes = {
  router: PropTypes.object,
}

export default Router
