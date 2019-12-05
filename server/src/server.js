const express = require('express');
const bodyParser = require('body-parser');
const uuidv5 = require('uuid/v5');
const cors = require('cors');
const Cart = require('./Cart.model');

const connectToMongoDB = require('./connection');
const products = require('./products');

const app = express();
const port = 8080;

const uuidNamespace = '3ab4823f-6c76-4408-97f6-556e9e11649f';

const userIDMiddleware = (req, res, next) => {
  req.userID = uuidv5(req.headers['user-agent'], uuidNamespace);
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userIDMiddleware);
app.use(cors);

app.get('/', async (req, res) => {
  res.json({ message: 'Hello World!!!!' });
});

app.get('/products', async (req, res) => {
  console.log('userID,', req.userID);
  console.log(`GET /products, userID: ${req.userID}`);
  res.json(products);
});

app.get('/cart', async (req, res) => {
  const cart = await Cart.findOne({ userID: req.userID }).lean();
  console.log(`GET /cart, userID: ${req.userID}`);
  if (cart) {
    res.json(cart.contents);
  } else {
    res.json([]);
  }
});

// For debug purposes. Bad idea to let any user get all carts...
app.get('/carts', async (req, res) => {
  const carts = await Cart.find().lean();
  console.log(`GET /carts, userID: ${req.userID}, carts.length: ${carts.length}`);
  if (carts) {
    res.json(carts);
  } else {
    res.json([]);
  }
});

app.put('/cart', async (req, res) => {
  console.log(`PUT /cart, userID: ${req.userID}`);
  const cartContents = Object.values(req.body);
  if (cartContents.length > 0) {
    const cart = {
      userID: req.userID,
      contents: cartContents.map(cartItem => ({
        id: cartItem.id,
        make: cartItem.make,
        model: cartItem.model,
        year: cartItem.year,
        price: cartItem.price,
        color: cartItem.color,
        count: cartItem.count
      }))
    };

    if (await Cart.exists({ userID: req.userID })) {
      await Cart.replaceOne({ userID: req.userID }, cart);
      res.json({ message: 'cart updated', cart: cart });
    } else {
      await new Cart(cart).save().then(() => console.log(`cart created, userID: ${req.userID}`));
      res.json({ message: 'cart created', cart: cart });
    }
  } else {
    // Handle case where the user has removed all items from their cart
    const cart = {
      userID: req.userID,
      contents: []
    };
    if (await Cart.exists({ userID: req.userID })) {
      await Cart.replaceOne({ userID: req.userID }, cart);
      res.json({ message: 'cart updated', cart: cart });
    } else {
      await new Cart(cart).save().then(() => console.log(`cart emptied, userID: ${req.userID}`));
      res.json({ message: 'removing cart contents' });
    }
  }
});

app.delete('/carts', async (req, res) => {
  console.log(`!!! Deleting all carts !!!, userID: ${req.userID}`);
  await Cart.deleteMany({ userID: req.userID });
  res.send('all carts deleted');
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);

  connectToMongoDB().then(() => {
    console.log('MongoDB connected!');
  });
});
