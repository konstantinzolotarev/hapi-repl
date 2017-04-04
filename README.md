# Hapi.js REPL plugin

## Installation

```bash
$ npm install --save-dev hapi-repl
```

Note that you should not use this plugin in `production` !

After installing just add it into your Hapi.js

```javascript
'use strict'

const replPlugin = require('./index')
const Hapi = require('hapi')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({host: 'localhost', port: 8000})

server.register([replPlugin], (err) => {
  if (err)
    throw err

  // Start the server
  server.start((err) => {
    if (err)
      throw err
  })
})

```

After starting app it will start your repl automatically
