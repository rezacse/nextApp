import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import { FormLabel } from '@material-ui/core';
import AppTxtInput from '../core/AppTxtInput';

const AppFormField = ({
  label,
  name,
  type,
  isFullWidth,
  className,
  inputProps,
  ...rest
}) => {
  const { setFieldTouched, handleChange, errors, touched, values } =
    useFormikContext();
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
        type={type}
        value={values[name] || ''}
        onBlur={() => {
          setFieldTouched(name);
        }}
        changeHandler={handleChange(name)}
        error={!!error}
        helperText={error}
        inputProps={inputProps}
      />

      {/* <AppErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </>
  );
};

AppFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  isFullWidth: PropTypes.bool,
  className: PropTypes.string,
  inputProps: PropTypes.objectOf(PropTypes.any)
};
AppFormField.defaultProps = {
  label: '',
  type: 'text',
  isFullWidth: true,
  className: '',
  inputProps: {}
};

export default AppFormField;
