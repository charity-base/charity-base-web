const domain = 'https://charitybase.uk'

const charityBaseApiUri = process.env.NODE_ENV === 'production' ? `${domain}/api` : '/api'

const charityBaseApiKey = 'my-charity-base-api-key'

const googleApiKey = 'my-google-api-key'

const auth0ClientId = 'my-auth0-client-id'

const auth0RedirectUri = process.env.NODE_ENV === 'production' ? domain : 'http://localhost:3000'

export {
  charityBaseApiKey,
  charityBaseApiUri,
  googleApiKey,
  auth0ClientId,
  auth0RedirectUri,
}
