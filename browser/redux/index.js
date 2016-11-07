import { combineReducers } from 'redux';
import products from './products'
import currentProduct from './product'
import cartProducts from './cart'
import order from './order'
import orders from './orderhistory'

export default combineReducers({
  products,
  currentProduct,
  cartProducts,
  order,
  orders
});
