import { combineReducers } from 'redux';
import products from './products'
import currentProduct from './product'
import cartProducts from './cart'
import order from './order'
import orders from './orderhistory'
import account from './account'
import userId from './user'
import adminorders from './admin'
import user from './user'

export default combineReducers({
  products,
  currentProduct,
  cartProducts,
  order,
  orders,
  account,
  userId,
  adminorders
  user
});
