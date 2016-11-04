'use strict'

const epilogue = require('APP/server/epilogue');
const db = require('APP/db');
const addressModel = db.model('addresses');

const customAddressesRoutes = require('express').Router() 
module.exports = customAddressesRoutes

// Epilogue will automatically create standard RESTful routes
const addresses = epilogue.resource({
	model: db.model('addresses'),
	endpoints: ['/addresses', '/addresses/:id']
});

