const path = require('path')
const express = require('express')
const helmet = require('helmet')
const app = express()
const port = 4200

function startServer(port) {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [
          "'self'",
          "https://ya-praktikum.tech",
          "fonts.googleapis.com",
          "'nonce-eef8264c4994bf6409c518251ac7c9614446'"
        ],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        styleSrc: ["'self'", "fonts.googleapis.com", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-eval'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    })
  );

  app.use(helmet.hidePoweredBy())
  app.use(helmet.xssFilter())

  app.use(express.static(path.join(__dirname, 'dist')))

  app.get('*', function (request, response) {
    response.sendFile(__dirname + "/dist/index.html")
  });

  app.listen(port, () => {
    console.log(`app start at http://localhost:${port}`)
  })
}

startServer(port)
