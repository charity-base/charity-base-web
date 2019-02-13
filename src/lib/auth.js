import auth0 from 'auth0-js'
import jwtDecode from 'jwt-decode'
import { auth0ClientId, auth0RedirectUri } from './constants'

var tokenRenewalTimeout

class Auth {
  constructor({ auth0Config }) {
    this.auth0 = new auth0.WebAuth(auth0Config)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.renewToken = this.renewToken.bind(this)
    this.scheduleRenewal = this.scheduleRenewal.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.setSession = this.setSession.bind(this)
    this.getUser = this.getUser.bind(this)
    this.sendPasswordResetEmail = this.sendPasswordResetEmail.bind(this)
    this.wrapAuthentication = this.wrapAuthentication.bind(this)
  }

  login(history) {
    const { pathname, search } = history.location
    const origin_uri = `${pathname}${search}`
    localStorage.setItem('origin_uri', origin_uri)
    this.auth0.authorize()
  }

  internalRedirect(history) {
    const origin_uri = localStorage.getItem('origin_uri')
    history.push(origin_uri || '/')
    localStorage.removeItem('origin_uri')
  }

  handleAuthentication(history) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) { // && authResult.idToken
        this.setSession(authResult)
        this.internalRedirect(history)
      } else if (err) {
        this.internalRedirect(history)
        console.log(err)
      }
    })
  }

  renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err)
        this.logout()
      } else {
        this.setSession(result)
      }
    })
  }

  scheduleRenewal() {
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    var delay = expiresAt - Date.now()
    if (delay > 0) {
      tokenRenewalTimeout = setTimeout(this.renewToken, delay)
    }
    if (expiresAt && delay < 0) {
      this.renewToken()
    }
  }

  setSession(authResult) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + Date.now())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.scheduleRenewal()
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('origin_uri')
    clearTimeout(tokenRenewalTimeout)
    this.auth0.logout({
      clientID: auth0ClientId,
      returnTo: auth0RedirectUri,
    })
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return Date.now() < expiresAt
  }

  getUser() {
    return this.isAuthenticated() ? jwtDecode(localStorage.getItem('id_token')) : null
  }

  sendPasswordResetEmail({ email, connection }, cb) {
    return this.auth0.changePassword({ email, connection }, cb)
  }

  wrapAuthentication = history => func => () => {
    if (this.isAuthenticated()) {
      return func()
    }
    this.login(history)
  }
}

const auth0Config = {
  audience: 'https://charitybase.uk/api',
  domain: 'charity-base.eu.auth0.com',
  clientID: auth0ClientId,
  redirectUri: auth0RedirectUri,
  responseType: 'token id_token',
  scope: 'openid profile email',
}

const auth = new Auth({
  auth0Config
})

export default auth
