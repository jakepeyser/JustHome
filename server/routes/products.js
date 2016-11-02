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

customProductRoutes.post('/products', (req, res, next) => {
    products.model.create(req.body)
    .then(created => res.status(201).send(created))
    .catch(next);
})