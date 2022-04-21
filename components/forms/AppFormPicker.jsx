import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import { FormLabel } from '@material-ui/core';
import AppSelect from '../core/AppSelect';

const AppFormPicker = ({
  label,
  name,
  className,
  options,
  clearFieldName,
  defaultTitle,
  defaultValue,
  placeholder,

  ...rest
}) => {
  const {
    handleChange,
    errors,
    touched,
    values,
    // initialValues,
    setValues
  } = useFormikContext();

  const error = touched[name] ? errors[name] : undefined;

  const onChanged = (evt) => {
    if (!evt || !evt.target) return;
    const value = parseInt(evt.target.value, 10);
    if (!clearFieldName) handleChange(evt);
    else {
      values[name] = value;
      values[clearFieldName] = null; // initialValues[clearFieldName];
      setValues(values, true);
    }
  };

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <AppSelect
        name={name}
        options={options}
        changeHandler={onChanged}
        className={className}
        error={!!error}
        value={values[name] || undefined}
        defaultTitle={defaultTitle}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {/* <AppErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
};

AppFormPicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  clearFieldName: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  defaultTitle: PropTypes.string,
  defaultValue: PropTypes.number
};

AppFormPicker.defaultProps = {
  className: '',
  label: '',
  clearFieldName: '',
  defaultTitle: '',
  placeholder: '',
  defaultValue: undefined
};

export default AppFormPicker;
