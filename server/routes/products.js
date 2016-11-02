'use strict'

const epilogue = require('APP/server/epilogue')
const db = require('APP/db')

const customProductRoutes = require('express').Router() 

// Custom routes go here.

module.exports = customProductRoutes;

// Epilogue will automatically create standard RESTful routes
const products = epilogue.resource({
    model: db.model('products'),
    endpoints: ['/products', '/products/:id']
})

customProductRoutes.get('/:id/reviews', function(req, res, next){
    const reviewModel = db.model('reviews');
    reviewModel.findAll({where:{
        product_id: req.params.id
    }})
    .then(revs => res.send(revs))
})

customProductRoutes.get('/:productid/reviews/:reviewid', function(req, res, next){
    const reviewModel = db.model('reviews');
    reviewModel.findAll({where:{
        product_id: req.params.productid,
        id: req.params.reviewid
    }})
    .then(revs => res.send(revs))
})