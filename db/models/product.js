'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
	name: { type: Sequelize.STRING, allowNull: false },
	price: { type: Sequelize.FLOAT, allowNull: false },
	description: Sequelize.TEXT,
	quantity: { type: Sequelize.INTEGER, allowNull: false },
	type: { type: Sequelize.ENUM, values: ['chair', 'table', 'bed', 'closet', 'sofa', 'desk'] },
	style: { type: Sequelize.ENUM, values: ['Coastal', 'Contemporary', 'Traditional', 'modern', 'gothic'] },
	color: Sequelize.STRING,
	material: Sequelize.STRING
})

module.exports = Product;