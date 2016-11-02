import { createStore } from 'redux'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import axios from 'axios';

import rootReducer from 'App/browser/redux/index'
import actualStore from 'App/browser/store'
import { axiosResponse } from './utils.js'

import { RECEIVE_PRODUCTS,
         receiveProducts,
         fetchProducts } from 'App/browser/redux/products'


describe('Products', () => {
  describe('Redux', () => {

    let testProducts;
    beforeEach('Create testing store from reducer', () => {
      testProducts = [
        { id: 3, name: 'Product #1' },
        { id: 2, name: 'Product #2' },
        { id: 3, name: 'Product #3' }
      ];
    });

    describe('action creators', () => {
      it(`${RECEIVE_PRODUCTS} returns expected action`, () => {
        const action = receiveProducts(testProducts);
        expect(action).to.be.deep.equal({
          type: RECEIVE_PRODUCTS,
          products: testProducts
        });
      });
    });

    describe('store/reducer', () => {
      let testingStore;
      beforeEach('Create testing store from reducer', () => {
        testingStore = createStore(rootReducer);
      });

      it('has initial state of empty products array', () => {
        const currentStoreState = testingStore.getState();
        expect(currentStoreState.products).to.be.deep.equal([]);
      });

      it(`reducing on ${RECEIVE_PRODUCTS}`, () => {
        testingStore.dispatch(receiveProducts(testProducts));
        const newState = testingStore.getState();
        expect(newState.products).to.be.deep.equal(testProducts);
      });

      it('retrieving products asynchronously', (done) => {
        const fakeDispatch = (dispatchedItem) => {
          testingStore.dispatch(dispatchedItem);
          const newState = testingStore.getState();
          expect(newState.products).to.be.deep.equal(testProducts);
          done();
        }

        let mock = sinon.mock(axios).expects('get').once().withArgs('/api/products')
          .returns(axiosResponse(testProducts));
        fetchProducts()(fakeDispatch);
        mock.verify();
      });
    });
  });
});
