import axios from 'axios';

import {
  fetchProductsPendingAction,
  fetchProductsSuccessAction,
  fetchProductsErrorAction
} from './actions';

const fetchProductsAction = () => {
  return dispatch => {
    dispatch(fetchProductsPendingAction());
    // try {
    //   const response = await axios.get('/products');
    //   console.log(response);
    //   if (response.error) throw response.error;
    //   dispatch(fetchProductsAction(response.data));
    // } catch (error) {
    //   console.error(error);
    //   dispatch(fetchProductsErrorAction(error));
    // }

    dispatch(fetchProductsPendingAction());
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchProductsSuccessAction(res.products));
        return res.products;
      })
      .catch(error => {
        dispatch(fetchProductsErrorAction(error));
      });
  };
};

export default fetchProductsAction;
