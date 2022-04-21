import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import { useFormikContext } from 'formik';
import { FormControlLabel } from '@material-ui/core';

const AppCheckbox = ({ name, isDisabled, label, className, ...rest }) => {
  const { handleChange, errors, touched, values } = useFormikContext();
  const error = touched[name] ? errors[name] : undefined;

  return (
    <>
      <FormControlLabel
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        className={className}
        error={error || undefined}
        control={
          <Checkbox
            disabled={isDisabled}
            name={name}
            checked={values[name] || false}
            value={values[name]}
            onChange={handleChange}
          />
        }
        label={label}
      />
      {error && <p className="formError w100p ml2">{error}</p>}
    </>
  );
};

AppCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string
};

AppCheckbox.defaultProps = {
  children: '',
  isDisabled: false,
  error: undefined,
  className: ''
};

export default AppCheckbox;
