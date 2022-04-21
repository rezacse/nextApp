import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const AppTxtInput = ({
  label,
  name,
  value,
  type,
  changeHandler,
  isDisabled,
  fullWidth,
  helperText,
  error,
  className,
  inputProps,
  ...rest
}) => {
  // const handleChanged = (event) => {
  //   event.persist();
  //   changeHandler(event);
  // };

  return (
    <TextField
      margin="dense"
      variant="outlined"
      className={className}
      fullWidth
      disabled={isDisabled}
      label={label}
      name={name}
      type={type}
      // inputProps={type === 'number' ? { min: '0' } : {}}
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      error={error}
      helperText={helperText}
      onChange={changeHandler}
      inputProps={inputProps}
    />
  );
};

AppTxtInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  changeHandler: PropTypes.func,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
  inputProps: PropTypes.objectOf(PropTypes.any)
};

AppTxtInput.defaultProps = {
  label: '',
  value: '',
  fullWidth: true,
  type: 'text',
  isDisabled: false,
  changeHandler: () => {},
  helperText: '',
  error: false,
  className: '',
  inputProps: {}
};

export default AppTxtInput;
