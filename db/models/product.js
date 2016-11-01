'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('products', {
  name: Sequelize.STRING,  
  price: Sequelize.FLOAT,
  description: Sequelize.TEXT,
  quantity: Sequelize.INTEGER,
  type: {
      type: Sequelize.ENUM,
      values: ['chair', 'table']
  },
  style: {
      type: Sequelize.ENUM,
      values: ['brutalist', 'art deco', 'modern']
  },
  color: Sequelize.STRING,
  material: Sequelize.STRING
})

module.exports = Product;