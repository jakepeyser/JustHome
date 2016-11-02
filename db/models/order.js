'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Order = db.define('orders', {
	confirmation_number: Sequelize.STRING,
	status: {
		type: Sequelize.ENUM,
		values: ['processing', 'shipped']
	},
	order_date: Sequelize.DATE
},{
	hooks: {
		beforeValidate: function(){
			this.order_date = new Date();
		}
	}
})

module.exports = Order;