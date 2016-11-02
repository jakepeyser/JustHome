'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Cart = db.define('carts', {
	sessionId: Sequelize.STRING,
	quantity: Sequelize.INTEGER
})

module.exports = Cart;