const domain = "https://charitybase.uk"

const isProduction = process.env.NODE_ENV === "production"

const charityBaseGqlApiUri = isProduction
  ? `${domain}/api/graphql`
  : "/api/graphql"

const charityBaseGqlAuthUri = isProduction
  ? `${domain}/auth/graphql`
  : "/auth/graphql"

const charityBaseApiKey = process.env.REACT_APP_CHARITY_BASE_API_KEY

const auth0Config = {
  audience: "https://charitybase.uk/api",
  domain: "charity-base.eu.auth0.com",
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: isProduction ? domain : "http://localhost:3000",
  responseType: "token id_token",
  scope: "openid profile email edit:apikeys",
}

const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN

export {
  charityBaseApiKey,
  charityBaseGqlApiUri,
  charityBaseGqlAuthUri,
  auth0Config,
  mapBoxToken,
}
