import axios from 'axios';
import { browserHistory } from 'react-router';

// ---------------------> TAGS <---------------------
export const RECEIVE_CART = 'RECEIVE_CART';
export const ADDED_PRODUCT = 'ADDED_PRODUCT';

// ----------------> ACTION CREATORS <----------------
export const receiveCart = cartProducts => ({
    type: RECEIVE_CART,
    cartProducts
});

export const addedProduct = product => ({
    type: ADDED_PRODUCT,
    product
})

// --------------------> THUNKS <--------------------

export const fetchCart = (id) => dispatch => {
  // change this to cart api
    axios.get(`/api/cart-products`)
        .then(res => dispatch(receiveCart(res.data)))
        .catch(err => {
            console.error('Unable to fetch cart', err);
        });
};

export const addToCart = (id) => dispatch => {
    const body = {
        productId: id,
        quantity: 1
    }
    axios.post(`/api/cart-products`, body)
        .then(res => {
            dispatch(addedProduct(res.data));
            browserHistory.push('/cart');
        })
        .catch(err => console.error('unable to add to cart', err))
}

// --------------------> REDUCER <--------------------
export default function cart(state = [], action) {
  switch (action.type) {
    case RECEIVE_CART:
      return action.cartProducts;
    case ADDED_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
