const path = require('path')
const express = require('express')
const app = express()
const port = 4200

app.use(express.static(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})