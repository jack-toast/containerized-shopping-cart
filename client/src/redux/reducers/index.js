import { combineReducers } from 'redux';

import availableProducts from './availableProducts';
import cartContents from './cartContents';

const rootReducer = combineReducers({
  availableProducts,
  cartContents
});

export default rootReducer;
