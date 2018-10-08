const charityBaseApiKey = 'my-charity-base-api-key'

const googleApiKey = 'my-google-api-key'

const auth0ClientId = 'my-auth0-client-id'

const auth0RedirectUri = process.env.NODE_ENV === 'production' ? 'https://charitybase.uk' : 'http://localhost:3000'

export {
  charityBaseApiKey,
  googleApiKey,
  auth0ClientId,
  auth0RedirectUri
}
