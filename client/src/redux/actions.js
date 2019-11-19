import {
  ADD_ITEM_TO_CART,
  SET_ITEM_COUNT,
  REMOVE_ITEM_FROM_CART,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR
} from './actionTypes';

export const addItemToCartAction = (newItem, fromBackend) => {
  return {
    type: ADD_ITEM_TO_CART,
    payload: { newItem, fromBackend }
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

// Data fetching

export const fetchProductsPendingAction = () => {
  return {
    type: FETCH_PRODUCTS_PENDING
  };
};

export const fetchProductsSuccessAction = newProducts => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { newProducts }
  };
};

export const fetchProductsErrorAction = error => {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: { error }
  };
};
