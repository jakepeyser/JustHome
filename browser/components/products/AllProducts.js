import React from 'react';
import { Link } from 'react-router';
import { AutoComplete, SelectField, MenuItem } from 'material-ui'
import { roundPrice, getStars } from '../../utils'

// Replace with categories
const categories = [
  'All',
  'Bedroom',
  'Office',
  'Living Room'
]

// TODO: Place actual values inside jsx component
export default ({ products, category, handleChange }) => {
  return (
    <div id="products" className="col-xs-12">
      <div className="row">
        <div className="search col-sm-9">
          <AutoComplete
            dataSource={ products }
            floatingLabelText="Search"
            fullWidth={ true }
            onUpdateInput={(text) => handleChange("searchText", text) }
          />
        </div>
        <div className="filter col-sm-3">
          <SelectField
            floatingLabelText="Category"
            value={category}
            onChange={(event, key, value) => handleChange("category", value) }
          >
          {
            categories.map((category, i) => {
              return <MenuItem key={i} value={i} primaryText={category} />
            })
          }
          </SelectField>
        </div>
      </div>
      <div className="row">
      {
        products.map((product) => {
          return (
          <div key={ product.id } className="col-sm-4 col-lg-4 col-md-4">
            <div className="thumbnail">
              <img src={product.images[0]} alt="" />
              <div className="caption">
                <h4 className="pull-right">{`$${roundPrice(product.price)}`}</h4>
                <h4>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h4>
              </div>
              <div className="pull-right ratings">
              {
                // TODO: Replace with real average rating
                getStars(3)
              }
              </div>
            </div>
          </div>
          )
        })
      }
      </div>
    </div>
  )
};
