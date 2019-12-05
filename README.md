# containerized-shopping-cart

## How to run

Spin up the containers

```
docker-compose up --build
```

After that, open your browser to [localhost:4000](localhost:4000)

Verified that this builds properly on:

- 2017 MB Pro running OSX 10.15.1 (19B88)
- My ~10 y/o desktop running Ubuntu 18.04.3

It should work on any machine with a fairly recent docker desktop or docker CE version installed. If it doesn't, please let me know and I'll try to reproduce / fix!

## Future Considerations / Improvements - Frontend

- Products
  - Get realistic prices. A Land Rover Discovery II is not \$7304 sadly.
  - Load different cars each time. Some sort of randomizer.
  - Don't draw them with my mouse...
- User Interaction
  - I think using draggable components could be a good way to add items to your cart, especially on mobile.
- User Interface
  - Optimize for mobile. Would need some designer input.
- Use redux-thunk for action sideeffects.

## Future Considerations / Improvements - Backend

- Put all async/awaits in try-catch blocks
- Also in DELETE /carts I do a `deleteMany` for carts with a given userId but in PUT /cart I do an EXISTS and a REPLACEONE. so in one place I'm assuming only one cart per userId, but in another place assuming multiple carts per userId.
- use .lean() when calling findOne or findMany if returning the POJO without doing any other mongo actions on the cursor
- console.log() and console.error() are synchronous. Use something like winston (https://www.npmjs.com/package/winston) instead
- Use gzip compression. Networking takes longer than compression and decompression!
- Improve error handling.
  - send an email when process.on('uncaughtException') is hit in production.
- Handle JSON.parse exceptions
- Create a function getUserIDFromReqMMiddleware = (req, res, next) => That does the exact same logic, but this saves the userId to req.
  - So req.userId = uuidv5(req.headers['user-agent'], uuidNamespace);
  - Then in the router you would do app.use(getUserIDFromReqMMiddleware)
  - Then in each request you can just use req.userId since it gets set for every request

* Express / Mongoose
  - Abstract the DB related code out of the main `server.js` file.
    - Would make it far easier to read at a glance.
  - Update the entries in the DB when items are added instead of replacing the entire entry.
    - Would reduce network consumption. Would also spend less time processing data and waiting around.
  - Add the products to the database.

Feedback welcome!
