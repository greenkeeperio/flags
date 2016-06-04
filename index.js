var url = require('url')

var _ = require('lodash')
var nerfDart = require('nerf-dart')
var nopt = require('nopt')

var rc = require('@greenkeeper/rc')

var types = {
  api: String,
  help: Boolean,
  organization: String,
  postpublish: Boolean,
  private: Boolean,
  slug: String,
  version: Boolean,
  manual: Boolean,
  loglevel: [
    'error',
    'http',
    'info',
    'silent',
    'silly',
    'verbose',
    'warn'
  ]
}

var rcFlags = rc.get()
nopt.clean(rcFlags, types)

var cliFlags = nopt(types, {
  h: '--help',
  usage: '--help',
  v: '--version',
  s: ['--loglevel', 'silent'],
  d: ['--loglevel', 'info'],
  dd: ['--loglevel', 'verbose'],
  ddd: ['--loglevel', 'silly'],
  silent: ['--loglevel', 'silent'],
  verbose: ['--loglevel', 'verbose'],
  quiet: ['--loglevel', 'warn']
})

var flags = module.exports = _.assign({}, rcFlags, cliFlags)

flags.api = url.parse(flags.api || 'https://api.greenkeeper.io/').format()
flags.token = rc.get()[nerfDart(flags.api) + 'token'] || flags.token
flags.postpublish = flags.hasOwnProperty('postpublish')
  ? flags.postpublish
  : true
flags._rc = rc
