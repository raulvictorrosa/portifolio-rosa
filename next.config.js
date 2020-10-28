const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    config.plugins.push(new Dotenv({ silent: true }))

    return config
  }
}
