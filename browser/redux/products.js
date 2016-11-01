import axios from 'axios';

// ---------------------> TAGS <---------------------
const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

// ----------------> ACTION CREATORS <----------------
const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products
});

// --------------------> THUNKS <--------------------

export const fetchProducts = () => dispatch => {
  axios.get('/api/products')
    .then(res => dispatch(receiveProducts(res.data)))
    .catch(err => {
      console.error('Unable to fetch products', err);
    });
};

// --------------------> REDUCER <--------------------
export default function products(state = [], action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
