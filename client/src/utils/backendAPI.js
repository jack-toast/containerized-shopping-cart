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
    // console.log('GET /cart', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCarts = async () => {
  try {
    const response = await axios.get('/carts');
    // console.log('GET /carts', response.data);
  } catch (error) {
    console.error(error);
  }
};

export const setCartContents = async newCartContents => {
  try {
    const response = await axios.put('/cart', newCartContents);
    // console.log('PUT /cart', response.data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllCarts = async () => {
  try {
    const response = await axios.delete('/carts');
    // console.log('DELETE /carts', response.data);
  } catch (error) {
    console.error(error);
  }
};
