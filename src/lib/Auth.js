import auth0 from 'auth0-js'
import jwtDecode from 'jwt-decode'
import { auth0ClientId, auth0RedirectUri } from './constants'

class Auth {
  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getUser = this.getUser.bind(this)
    this.ensureAuthenticated = this.ensureAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    audience: 'https://charitybase.uk/api',
    domain: 'charity-base.eu.auth0.com',
    clientID: auth0ClientId,
    redirectUri: auth0RedirectUri,
    responseType: 'token id_token',
    scope: 'openid profile email',
  })

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

  setSession(authResult) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  logout(history) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('origin_uri')
    this.internalRedirect(history)
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getUser() {
    return this.isAuthenticated() ? jwtDecode(localStorage.getItem('id_token')) : null
  }

  ensureAuthenticated = history => func => () => {
    if (this.isAuthenticated()) {
      return func()
    }
    this.login(history)
  }
}

export default Auth
