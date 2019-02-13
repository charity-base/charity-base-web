import React, { Component } from 'react'
import PropTypes from 'prop-types'
import auth from '../../lib/auth'

class AuthHandler extends Component {
  componentDidMount() {
    auth.handleAuthentication(this.context.router.history)
    auth.scheduleRenewal()
  }
  render() {
    return null
  }
}
AuthHandler.contextTypes = {
  router: PropTypes.object,
}

export default AuthHandler
