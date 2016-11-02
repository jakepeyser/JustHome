'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const LineItem = db.define('lineitems', {
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			isNonNegative: function(value){
				if (parseInt(value) < 0){
					throw new Error('Cannot have negative amount of item!')
				}
			}
		}
	},
	price: Sequelize.INTEGER
})

module.exports = LineItem;