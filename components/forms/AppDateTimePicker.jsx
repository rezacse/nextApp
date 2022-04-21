import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { useFormikContext } from 'formik';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
  // DateTimePicker
  // LocalizationProvider
} from '@material-ui/pickers';
import { FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  }
}));

const AppDateTimePicker = ({ label, name, maxDate, className, ...rest }) => {
  const classes = useStyles();

  const {
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue
  } = useFormikContext();

  const error = touched[name] ? errors[name] : undefined;

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          // disableToolbar
          className={clsx(classes.root, className)}
          autoOk
          variant="inline"
          // format="MMM/dd/yyyy"
          format="yyyy/MM/dd hh:mm a"
          name={name}
          margin="dense"
          // label={label}
          value={values[name] || null}
          minDate={new Date()}
          maxDate={maxDate || undefined}
          onBlur={() => setFieldTouched(name)}
          onChange={(date) => setFieldValue(name, date)}
          error={!!error}
          helperText={error}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

AppDateTimePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  maxDate: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string
};
AppDateTimePicker.defaultProps = {
  maxDate: undefined,
  label: '',
  className: ''
};

export default AppDateTimePicker;
