'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const Review = db.define('reviews', {
  rating: Sequelize.INTEGER,
  comment: Sequelize.TEXT
})

module.exports = Review;