'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const cartProduct = db.define('cartProducts', {
	sessionId: Sequelize.STRING,
	quantity: Sequelize.INTEGER
}, {
	validate: {
		noDuplicatedCartProducts: function(next) {
			cartProduct.findOne({
				where: {
					sessionId: this.sessionId,
					product_id: this.product_id
				}
			})
			.then(result => {
				if (result !== null) {
					next('Product already in the cart')
				}
				next()
			})
		}
	},
	classMethods: {
		clearCart: function(sessionId) {
			console.log('sessionId: ', sessionId)
			return 	cartProduct.destroy({
					where: { sessionId: sessionId }
				})
		}
	}
})

// TODO: session + product should be unique.


// Authed user
// // create asso with user


// not Authed user
// // session storage
// // local storage (put object and save it as cookie)

module.exports = cartProduct;

