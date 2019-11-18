import { ADD_ITEM_TO_CART, SET_ITEM_COUNT, REMOVE_ITEM_FROM_CART } from '../../actionTypes';

/**
 * Reducer for tracking items in cart
 */

const cartContents = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const { newItem } = action.payload;
      return {
        ...state,
        [newItem.id]: {
          ...newItem,
          count: state[newItem.id] ? state[newItem.id].count + 1 : 1
        }
      };
    }
    case REMOVE_ITEM_FROM_CART: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    case SET_ITEM_COUNT: {
      const { id, newCount } = action.payload;
      return {
        ...state,
        [id]: {
          ...state[id],
          count: newCount
        }
      };
    }
    default:
      return state;
  }
};

export default cartContents;
