const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.get('/cart', (req, res) => {
  res.send('heres some cart data');
});

app.listen(port, () => console.log(`server listening on port ${port}`));
