import mockAvailableProducts from './mockAvailableProducts';
/**
 * Using data generated on https://mockaroo.com/
 *
 */

const availableProducts = (state = mockAvailableProducts, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default availableProducts;
