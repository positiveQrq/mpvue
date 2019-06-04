var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE_URL: '"https://d60.bg-iddi.com/app"',
  IMG_URL: '"https://cdn.bg-iddi.com/d60/"'
})
