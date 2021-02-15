const path = require('path')
const express = require('express')
const helmet = require('helmet')
const app = express()
const port = process.env.PORT || 4200

function startServer(port) {
  app.use(express.static(path.join(__dirname, 'dist')))
  app.get('*', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html')
  });
  app.listen(port, () => console.log(`Listener on ${port}`))
}

startServer(port)
