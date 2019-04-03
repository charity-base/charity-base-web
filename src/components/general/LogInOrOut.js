import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import auth from '../../lib/auth'

const userName = user => {
  if (!user) return
  const name = user.given_name || user.nickname || 'User'
  const shortName = name.length > 16 ? (
    name.substring(0, 16) + '...'
  ) : name
  return shortName
}

export const LogOut = () => {
  return (
    <Button
      icon='logout'
      onClick={auth.logout}
      style={{ width: '100%' }}
    >
      Log Out
    </Button>
  )
}
LogOut.propTypes = {
}

export const LogIn = (_, { router }) => {
  return (
    <Button
      icon='login'
      onClick={() => {
        auth.login(router.history)
      }}
      style={{ width: '100%' }}
    >
      Log In
    </Button>
  )
}
LogIn.propTypes = {
}
LogIn.contextTypes = {
  router: PropTypes.object,
}

const LogInOrOut = ({ renderLoggedInText, renderLoggedOutText }) => {
  const user = auth.user
  const name = userName(user)
  return (
    <div style={{ width: '100%', textAlign: 'center', minHeight: '30px' }}>
      {user ? (
        <Fragment>
          {renderLoggedInText ? renderLoggedInText(name) : null}
          <LogOut />
        </Fragment>
      ) : (
        <Fragment>
          {renderLoggedOutText ? renderLoggedOutText(name) : null}
          <LogIn />
        </Fragment>
      )}
    </div>
  )
}
LogInOrOut.propTypes = {
  renderLoggedInText: PropTypes.func,
  renderLoggedOutText: PropTypes.func,
}

export default LogInOrOut
