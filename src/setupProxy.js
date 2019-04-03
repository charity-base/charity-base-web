const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/api/graphql', { target: 'http://localhost:4000/' }))
  app.use(proxy('/auth/graphql', { target: 'http://localhost:4001/' }))
};