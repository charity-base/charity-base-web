import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Auth from '../../lib/Auth'

const auth = new Auth()

class AuthHandler extends Component {
  componentDidMount() {
    auth.handleAuthentication(this.context.router.history)
  }
  render() {
    return null
  }
}
AuthHandler.contextTypes = {
  router: PropTypes.object,
}

export default AuthHandler
