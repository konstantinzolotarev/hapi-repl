'use strict'

const Repl = require('repl')
const packagejson = require('./package.json')

let repl

exports.register = function(server, options, next) {

  // https://nodejs.org/api/process.html#process_tty_terminals_and_process_stdout
  if (!process.stdout.isTTY) {
    server.log('info', 'trailpack-repl: No text terminal available. ')
    return next()
  }

  try {
    repl = Repl.start({
      prompt: '',
      useColors: true,
      replMode: Repl.REPL_MODE_STRICT //,
      // historySize: this.config.historySize
    })
    repl.pause()
    server.on('start', () => {
      // green prompt
      repl.setPrompt('\u001b[1;32mhapi > \u001b[0m')
      repl.resume()
      repl.write('', { name: 'return' })
    })

    server.on('stop', () => {
      if (!process.stdout.isTTY || !repl)
        return

      repl.removeAllListeners('exit')
      repl.close()
    })
  }
  catch (e) {
    server.log('error', e)
    server.log('warn', 'hapi-repl: Disabling REPL.')
    return next(e)
  }

  repl.on('exit', () => {
    if (typeof(server.stop) !== 'function')
      return process.exit()

    server.stop().then(() => process.exit())
  })

  repl.context.server = server

  next()
}

exports.register.attributes = {
  pkg: packagejson
}
