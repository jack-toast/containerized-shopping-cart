const express = require('express');
const bodyParser = require('body-parser');
const uuidv5 = require('uuid/v5');
const uuidv4 = require('uuid/v4');
const cors = require('cors');
const Cart = require('./Cart.model');

const connectToMongoDB = require('./connection');
const products = require('./products');

const app = express();
const port = 8080;

const uuidNamespace = '3ab4823f-6c76-4408-97f6-556e9e11649f';

// const getUserIDFromReqMiddleWare = (req, res, next) =>
//   uuidv5(req.headers['user-agent'], uuidNamespace);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(getUserIDFromReqMiddleWare);
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!!!!' });
});

app.get('/products', (req, res) => {
  console.log('GET /products');
  res.json(products);
});

app.get('/cart', async (req, res) => {
  const userID = getUserIDFromReq(req);
  const cart = await Cart.findOne({ userID });
  console.log('GET /cart');
  if (cart) {
    res.json(cart.contents);
  } else {
    res.json([]);
  }
});

app.get('/carts', async (req, res) => {
  const carts = await Cart.find();
  console.log('GET /carts');
  if (carts) {
    res.json(carts);
  } else {
    res.json([]);
  }
});

app.put('/cart', async (req, res) => {
  console.log('PUT /cart', req.body);
  const userID = getUserIDFromReq(req);
  const cartContents = Object.values(req.body);
  if (cartContents.length > 0) {
    const cart = {
      userID: userID,
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

    if (await Cart.exists({ userID: userID })) {
      await Cart.replaceOne({ userID: userID }, cart);
      res.json({ message: 'cart updated', cart: cart });
    } else {
      await new Cart(cart).save().then(() => console.log('cart created!'));
      res.json({ message: 'cart created', cart: cart });
    }
  } else {
    // Handle case where the user has removed all items from their cart
    const cart = new Cart({
      userID: userID,
      contents: []
    });
    await cart.save().then(() => console.log('cart emptied'));
    res.json({ message: 'removing cart contents' });
  }
});

app.delete('/carts', async (req, res) => {
  console.log('!!! Deleting all carts!!!');
  const userID = getUserIDFromReq(req);
  await Cart.deleteMany({ userID: userID });
  res.send('all carts deleted');
});

const getUserIDFromReq = req => {
  return uuidv5(req.headers['user-agent'], uuidNamespace);
};

app.listen(port, () => {
  console.log(`server listening on port ${port}`);

  connectToMongoDB().then(() => {
    console.log('MongoDB connected!');
  });
});
