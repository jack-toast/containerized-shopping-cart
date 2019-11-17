import { ADD_ITEM_TO_CART, SET_ITEM_QUANTITY } from './actionTypes';

export const addItemToCartAction = newItem => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: { newItem }
  };
};

export const setItemQuantityAction = newQuantity => {
  return {
    type: SET_ITEM_QUANTITY,
    payload: { newQuantity }
  };
};
