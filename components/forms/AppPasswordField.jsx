import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useFormikContext } from 'formik';

import { FormLabel } from '@material-ui/core';
import AppTxtInput from '../core/AppTxtInput';

const AppPasswordField = ({ label, name, isFullWidth, className, ...rest }) => {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values
  } = useFormikContext();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const error = touched[name] ? errors[name] : undefined;
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <AppTxtInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        fullWidth={isFullWidth}
        className={className}
        name={name}
        value={values[name]}
        type={showPassword ? 'text' : 'password'}
        onBlur={() => {
          setFieldTouched(name);
        }}
        changeHandler={handleChange(name)}
        error={!!error}
        helperText={error}
        InputProps={{
          autoComplete: `new-${name}`,
          endAdornment: (
            <InputAdornment position="end" style={{ marginRight: '-16px' }}>
              <IconButton
                aria-label={showPassword ? 'Hide' : 'Show'}
                onClick={toggleShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  );
};

AppPasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  isFullWidth: PropTypes.bool
};
AppPasswordField.defaultProps = {
  className: '',
  label: '',
  isFullWidth: false
};

export default AppPasswordField;
