import React from'react';
import { connect } from 'react-redux';
import Product from './Product';

const mapStateToProps = ({ currentProduct }) => ({ product: currentProduct });


const mapDispatchtoProps = ({dispatch}) => {
	return {
		buyClick : () => {
			console.log("BUY!")
		}
	}
}
// TODO: Add local state so we can loop through product images

export default connect(mapStateToProps, mapDispatchtoProps)(Product);
