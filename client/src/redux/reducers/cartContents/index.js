import { ADD_ITEM_TO_CART, SET_ITEM_COUNT, REMOVE_ITEM_FROM_CART } from '../../actionTypes';
import { setCartContents } from '../../../utils/backendAPI';

/**
 * Reducer for tracking items in cart
 */

const cartContents = (state = {}, action) => {
  console.log(action);
  const reducerCore = () => {
    switch (action.type) {
      case ADD_ITEM_TO_CART: {
        const { newItem } = action.payload;
        let newCount = newItem.count ? newItem.count : 1;
        if (!newItem.count) {
          newCount = state[newItem.id] ? state[newItem.id].count + 1 : 1;
        }
        return {
          ...state,
          [newItem.id]: {
            ...newItem,
            count: newCount
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

  /**
   * Let me know if this is bad practice!
   * I don' think this is too horrible,
   *  but there's probably a better approach that I didn't come up with.
   */
  const validActionTypes = [ADD_ITEM_TO_CART, SET_ITEM_COUNT, REMOVE_ITEM_FROM_CART];
  const newState = reducerCore();
  if (validActionTypes.includes(action.type) && !action.payload.fromBackend) {
    setCartContents(newState);
  }

  return newState;
};

export default cartContents;
