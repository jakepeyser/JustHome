'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Cart = db.define('carts', {
	sessionId: Sequelize.STRING,
	quantity: Sequelize.INTEGER
})

// Authed user
// // create asso with user


// not Authed user
// // session storage
// // local storage (put object and save it as cookie)

module.exports = Cart;