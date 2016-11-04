import React from'react';
import { connect } from 'react-redux';
import Order from './Order';

const mapStateToProps = ({ orderItems }) => ({ order: orderItems });

export default connect(mapStateToProps)(Order);
