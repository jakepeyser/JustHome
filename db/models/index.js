'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');
const Review = require('./review');
const Order = require('./order');
const LineItem = require('./lineItem');
const Address = require('./address');
const CreditCard = require('./creditcard');
const Cart = require('./cartProduct');


// Associations decided on the first day
// UserAdresses
Address.belongsTo(User, {as: 'shipping_address'});
Address.belongsTo(User, {as: 'billing_address'});
User.hasOne(Address, {as: 'shipping_address'});
User.hasOne(Address, {as: 'billing_address'});

// UserCreditCards
CreditCard.belongsTo(User);
User.hasMany(CreditCard);

// UserOrders
Order.belongsTo(User);
User.hasMany(Order);

// OrderLineItems
LineItem.belongsTo(Order);
Order.hasMany(LineItem);



// other associations we need
// OrderAdresses
Address.belongsTo(Order, {as: 'shipping_address'});
Address.belongsTo(Order, {as: 'billing_address'});
Order.hasOne(Address, {as: 'shipping_address'});
Order.hasOne(Address, {as: 'billing_address'});

// OrderCreditcards
CreditCard.belongsTo(Order);
Order.hasOne(CreditCard);

// LineItemsProduct
Product.belongsTo(LineItem);
LineItem.hasOne(Product);

// ReviewsProducts
Review.belongsTo(Product);
Product.hasMany(Review);

// UsersReviews
Review.belongsTo(User);
User.hasMany(Review);



module.exports = {User, Product, Review, Order, LineItem, Address, CreditCard, Cart};
