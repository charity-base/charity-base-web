const domain = 'https://charitybase.uk'

const isProduction = process.env.NODE_ENV === 'production'

const charityBaseApiUri = isProduction ? `${domain}/api` : '/api'

const charityBaseApiKey = 'my-charity-base-api-key'

const googleApiKey = 'my-google-api-key'

const auth0Config = {
  audience: 'https://charitybase.uk/api',
  domain: 'charity-base.eu.auth0.com',
  clientID: 'my-auth0-client-id',
  redirectUri: isProduction ? domain : 'http://localhost:3000',
  responseType: 'token id_token',
  scope: 'openid profile email',
}

export {
  charityBaseApiKey,
  charityBaseApiUri,
  googleApiKey,
  auth0Config,
}
