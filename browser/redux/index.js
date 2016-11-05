import { combineReducers } from 'redux';
import products from './products'
import currentProduct from './product'
import order from './order'

export default combineReducers({
  products,
  currentProduct,
  order
});
