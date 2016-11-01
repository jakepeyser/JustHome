import { connect } from 'react-redux';
import AllProducts from './AllProducts';

const mapStateToProps = ({ products }) => ({ products });

export default connect(mapStateToProps)(AllProducts);
