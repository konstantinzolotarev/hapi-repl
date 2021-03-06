'use strict'

const Hapi = require('hapi')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({ port: 8000 })

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function(request, reply) {

    return reply('hello world')
  }
})

server.register(require('../index'), (err) => {

  if (err)
    throw err

  // Start the server
  server.start((err) => {

    if (err) {
      throw err
    }
  })
})
