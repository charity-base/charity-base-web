import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import auth from '../../../lib/auth'

const userName = user => {
  if (!user) return
  const name = user.given_name || user.nickname || 'User'
  const shortName = name.length > 16 ? (
    name.substring(0, 16) + '...'
  ) : name
  return shortName
}

const Login = (_, { router }) => {
  const user = auth.getUser()
  return (
    <div style={{ width: '100%', textAlign: 'center', minHeight: '30px' }}>
      {user ? (
        <Fragment>
          <p>Logged in as {userName(user)}</p>
          <Button
            icon='logout'
            onClick={auth.logout}
            style={{ width: '100%' }}
          >
            Log Out
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>Log in to enable downloads</p>
          <Button
            icon='login'
            onClick={() => {
              auth.login(router.history)
            }}
            style={{ width: '100%' }}
          >
            Log In
          </Button>
        </Fragment>
      )}
    </div>
  )
}
Login.propTypes = {
}
Login.contextTypes = {
  router: PropTypes.object,
}

export default Login
