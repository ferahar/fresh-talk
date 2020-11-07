const path = require('path')
const express = require('express')
const app = express()
const port = 4200

const productRouter = express.Router();

productRouter.use("/login", function(request, response){
  response.send("Добавление товара");
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (request, response) {
  response.sendFile(__dirname + "/dist/index.html");
});

app.listen(port, () => {
  console.log(`app start at http://localhost:${port}`)
})