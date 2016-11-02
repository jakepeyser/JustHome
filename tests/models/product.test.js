// 'use strict'

// const db = require('APP/db')
// const product = require('APP/db/models/product')
// const {expect} = require('chai')

// describe('product', () => {
//   before('wait for the db', () => db.didSync)

//   describe('authenticate(plaintext: String) ~> Boolean', () => {
//     it('resolves true if the password matches', () =>
//       product.create({ password: 'ok' })
//         .then(product => product.authenticate('ok'))
//         .then(result => expect(result).to.be.true))

//     it("resolves false if the password doesn't match", () =>
//       product.create({ password: 'ok' })
//         .then(product => product.authenticate('not ok'))
//         .then(result => expect(result).to.be.false))
//   })
// })