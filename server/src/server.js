const express = require('express');
const products = require('./products');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.get('/products', (req, res) => {
  res.send(JSON.stringify(products));
});

app.get('/cart', (req, res) => {
  res.send('heres your cart data');
});

app.listen(port, () => console.log(`server listening on port ${port}`));
