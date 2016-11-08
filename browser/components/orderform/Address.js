import React from 'react';
import { Link } from 'react-router';
import { TextField } from 'material-ui';

export default ({ values, disabled, handleChange, type, legendWidth, errors }) => {
  return (
    <fieldset className="address form-box">
      <legend style={{width: `${legendWidth}px`}}>{`${type} Address`}</legend>
      <div className="row">
        <div className="col-xs-12">
          <TextField
            floatingLabelText="Street Address 1"
            value={values.street1}
            errorText={errors.street1}
            fullWidth={true}
            disabled={disabled}
            onChange={(evt) => handleChange("street1", evt.target.value, `${type.toLowerCase()}_address`) }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <TextField
            floatingLabelText="Street Address 2"
            value={values.street2}
            fullWidth={true}
            disabled={disabled}
            onChange={(evt) => handleChange("street2", evt.target.value, `${type.toLowerCase()}_address`) }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <TextField
            floatingLabelText="City"
            value={values.city}
            errorText={errors.city}
            fullWidth={true}
            disabled={disabled}
            onChange={(evt) => handleChange("city", evt.target.value, `${type.toLowerCase()}_address`) }
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3">
          <TextField
            floatingLabelText="State"
            value={values.state}
            errorText={errors.state}
            fullWidth={true}
            disabled={disabled}
            onChange={(evt) => handleChange("state", evt.target.value, `${type.toLowerCase()}_address`) }
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3">
          <TextField
            floatingLabelText="Zip Code"
            value={values.zip}
            errorText={errors.zip}
            fullWidth={true}
            disabled={disabled}
            onChange={(evt) => handleChange("zip", evt.target.value, `${type.toLowerCase()}_address`) }
          />
        </div>
      </div>
    </fieldset>
  )
};
