'use strict'

const epilogue = require('APP/server/epilogue')
const db = require('APP/db')

const customProductRoutes = require('express').Router() 

// Custom routes go here.

module.exports = customProductRoutes

// Epilogue will automatically create standard RESTful routes
const products = epilogue.resource({
  model: db.model('products'),
  endpoints: ['/products', '/products/:id']
})

customProductRoutes.get('/', (req, res) => {
	res.send(products.model)
})

customProductRoutes.get('/:id', (req, res) => {
	res.send(products[req.params.id])
})