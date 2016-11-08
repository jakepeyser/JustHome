import axios from 'axios';
import { browserHistory } from 'react-router';

// ---------------------> TAGS <---------------------
export const CREATED_PRODUCT = 'CREATED_PRODUCT';

// ----------------> ACTION CREATORS <----------------
export const createdProduct = newProduct => ({
  type: CREATED_PRODUCT,
  newProduct
});

// --------------------> THUNKS <--------------------

export const addProduct = ({ name, price, quantity, description, color, material, image1, style, type, category }) => (dispatch, getState) => {
  // If cart is empty, do not create order and redirect to /cart
//   if (!getState().cartProducts.length) {
//     console.error('Cannot checkout with an empty cart')
//     return browserHistory.push(`cart`);
//   }
  axios.post(`/api/products`, { name, price, quantity, description, color, material, image1, style, type, category })
    .then(res => {
      dispatch(createdProduct(res.data))
    //   browserHistory.push(`/confirmation/${res.data.id}`);
    })
    .catch(err => console.error('Unable to create product', err));
};

// --------------------> REDUCER <--------------------
export default function newProduct(state = {}, action) {
  switch (action.type) {
    case CREATED_PRODUCT:
      return action.newProduct;
    default:
      return state;
  }
}
