import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { debounce } from 'lodash';

import { FormLabel, InputAdornment } from '@material-ui/core';

import { CheckCircleOutline } from '@material-ui/icons';
import AppTxtInput from '../core/AppTxtInput';
import aService from '../../services/authService';

const AppEmailFormField = ({
  label,
  name,
  type,
  isFullWidth,
  className,
  ...rest
}) => {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    values,
    initialValues,
    setValues
  } = useFormikContext();
  const error = touched[name] ? errors[name] : undefined;

  const checkEmailAvailability = async (email) => {
    try {
      if (!values.isEmailAvailable && error) return;

      const resp = await aService.validateEmail(email);
      setValues((v) => ({
        ...v,
        isEmailAvailable: resp.isSuccess
      }));
    } catch (e) {
      setValues((v) => ({
        ...v,
        isEmailAvailable: false
      }));
    }
  };
  const debounceEmail = useCallback(debounce(checkEmailAvailability, 2000), []);

  useEffect(() => {
    if (initialValues[name]) checkEmailAvailability(initialValues[name]);
  }, [initialValues]);

  const getHelperText = () => {
    if (error) return errors[name];
    if (values.isEmailAvailable === false) return 'Email Already In Use';
    return '';
  };

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <AppTxtInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        fullWidth={isFullWidth}
        className={className}
        name={name}
        type={type}
        value={values[name]}
        onBlur={() => {
          setFieldTouched(name);
        }}
        changeHandler={(evt) => {
          handleChange(evt);
          debounceEmail(evt.target.value);
        }}
        error={!!error || values.isEmailAvailable === false}
        helperText={getHelperText()}
        InputProps={{
          autoComplete: `new-${name}`,
          endAdornment: (
            <InputAdornment position="end">
              {!error && values.isEmailAvailable ? (
                <CheckCircleOutline color="primary" />
              ) : (
                <></>
              )}
            </InputAdornment>
          )
        }}
      />

      {/* <AppErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
};

AppEmailFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  isFullWidth: PropTypes.bool,
  className: PropTypes.string
};
AppEmailFormField.defaultProps = {
  label: '',
  type: 'text',
  isFullWidth: true,
  className: ''
};

export default AppEmailFormField;
