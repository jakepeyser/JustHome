// Libraries
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux'

// React components
import App from './components/App'
import AllProductsContainer from './components/products/AllProductsContainer'

// Redux actions and thunks
import store from './store'
import { fetchProducts } from './redux/products'

const appEnter = () => store.dispatch(fetchProducts());

render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } onEnter={ appEnter }>
        <Route path="/products" component={ AllProductsContainer } />
        <IndexRoute component={ AllProductsContainer } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
