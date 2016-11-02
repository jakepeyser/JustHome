'use strict'

const db = require('APP/db')
const api = module.exports = require('express').Router()

api.get('/heartbeat', (req, res) => res.send({ok: true,}))
api.use('/auth', require('./auth'))
api.use('/users', require('./routes/users'))

api.use('/products', require('./routes/products'))
api.use('/carts', require('./routes/carts'))
api.use('/orders', require('./routes/orders'))
api.use('/addresses', require('./routes/addresses'))
api.use('/credit-cards', require('./routes/credit-cards'))
api.use('/reviews', require('./routes/reviews'))

// Send along any errors
api.use((err, req, res, next) => {
  res.status(500).send(err)
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())