# containerized-shopping-cart

## How to run

Spin up the containers

```
docker-compose up --build
```

After that, open your browser to [localhost:4000](localhost:4000)

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

- Express / Mongoose
  - Abstract the DB related code out of the main `server.js` file.
    - Would make it far easier to read at a glance.
  - Update the entries in the DB when items are added instead of replacing the entire entry.
    - Would reduce network consumption. Would also spend less time processing data and waiting around.
  - Add the products to the database.

Anyways, please let me know what you liked and what you didn't like!
