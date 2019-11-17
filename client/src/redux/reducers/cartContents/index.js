import { ADD_ITEM_TO_CART, SET_ITEM_QUANTITY } from '../../actionTypes';

/**
 * Reducer for tracking items in cart
 */

const cartContents = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      console.log(state, action);
      const { newItem } = action.payload;
      return {
        ...state,
        [newItem.id]: {
          ...newItem,
          count: state[newItem.id] ? state[newItem.id].count + 1 : 1
        }
      };
    }
    /**
     * Remember to only allow positive integers
     */
    case SET_ITEM_QUANTITY: {
      console.log(state, action);
      return state;
    }
    default:
      return state;
  }
};

export default cartContents;
