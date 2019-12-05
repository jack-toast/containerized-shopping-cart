import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_PENDING
} from '../../actionTypes';

/**
 * Using data generated on https://mockaroo.com/
 *
 */

const initialState = {
  pending: false,
  products: [],
  error: null
};

const availableProducts = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING: {
      return {
        ...state,
        pending: true
      };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      const { newProducts } = action.payload;
      return {
        ...state,
        pending: false,
        products: newProducts
      };
    }
    case FETCH_PRODUCTS_ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        pending: false,
        error
      };
    }
    default:
      return state;
  }
};

export default availableProducts;
