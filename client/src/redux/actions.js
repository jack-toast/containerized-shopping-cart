import { ADD_ITEM_TO_CART, SET_ITEM_COUNT, REMOVE_ITEM_FROM_CART } from './actionTypes';

export const addItemToCartAction = newItem => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: { newItem }
  };
};

export const removeItemFromCartAction = id => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: { id }
  };
};

export const setItemCountAction = (id, newCount) => {
  return {
    type: SET_ITEM_COUNT,
    payload: { id, newCount }
  };
};
