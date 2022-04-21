import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { FormLabel } from '@material-ui/core';

const AppTxtField = ({ label, value, className }) => {
  // const handleChanged = (event) => {
  //   event.persist();
  //   changeHandler(event);
  // };

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <TextField
        margin="dense"
        variant="outlined"
        className={className}
        fullWidth
        disabled
        type="text"
        value={value}
      />
    </>
  );
};

AppTxtField.propTypes = {
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  className: PropTypes.string
};

AppTxtField.defaultProps = {
  label: '',
  value: '',
  className: ''
};

export default AppTxtField;
