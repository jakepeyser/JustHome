'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
User.hasMany(CreditCard);
User.hasMany(Address);
User.hasMany(Order);

const Product = require('./product');

const Review = require('./review');
Review.belongsTo(Product);
Review.belongsTo(User);

const Order = require('./order');
Order.belongsTo(User);
Order.hasMany(LineItem);
Order.hasOne(Address, {as: 'shipping_address'});
Order.hasOne(Address, {as: 'billing_address'});
Order.hasOne(CreditCard);

const LineItem = require('./lineitem');
LineItem.belongsTo(Order);
// LineItem.hasOne(Product);

const Address = require('./address');
Address.belongsTo(Order, {as: 'shipping_address'});
Address.belongsTo(Order, {as: 'billing_address'});

const CreditCard = require('./creditcard');
CreditCard.belongsTo(User);
CreditCard.belongsTo(Order);

const Cart = require('./cart');
Cart.hasMany(LineItem);
Cart.belongsTo(User);

module.exports = {User, Product, Review, Order, LineItem, Address, CreditCard, Cart};
