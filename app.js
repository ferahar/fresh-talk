const path = require('path')
const express = require('express')
const app = express()
const port = 4200

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})