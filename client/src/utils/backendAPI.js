import axios from 'axios';

export const getAvailableProducts = async (
  fetchProductsPendingAction,
  fetchProductsSuccessAction,
  fetchProductsErrorAction
) => {
  fetchProductsPendingAction();
  try {
    const response = await axios.get('/products');
    // console.log('GET /products', response.data);
    if (response.data) {
      fetchProductsSuccessAction(response.data);
    }
  } catch (error) {
    fetchProductsErrorAction(error);
    console.error(error);
  }
};

export const getCartContents = async () => {
  try {
    const response = await axios.get('/cart');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCarts = async () => {
  try {
    await axios.get('/carts');
  } catch (error) {
    console.error(error);
  }
};

export const setCartContents = async newCartContents => {
  try {
    await axios.put('/cart', newCartContents);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllCarts = async () => {
  try {
    await axios.delete('/carts');
  } catch (error) {
    console.error(error);
  }
};
