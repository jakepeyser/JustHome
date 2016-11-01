'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('APP/db')

const CreditCard = db.define('creditcards', {
    number: Sequelize.STRING,
    expiry_date: Sequelize.DATE,
    security_code: {
        type: Sequelize.INTEGER,
        validate: {
            isThreeDigit: function(value){
                if (value > 999 || value < 100) {
                    throw new Error('Security code must be three digits!');
                }
            }
        }
    }
})

module.exports = CreditCard;