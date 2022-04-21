import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { useFormikContext } from 'formik';

const useStyles = makeStyles(() => ({
  root: {
    // width: '100%'
  }
}));

const AppDatePicker = ({ label, name, maxDate, className, ...rest }) => {
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        className={clsx(classes.root, className)}
        autoOk
        variant="inline"
        format="MMM/dd/yyyy"
        name={name}
        label={label}
        value={values[name]}
        // maxDate={maxDate}
        margin="dense"
        onBlur={() => setFieldTouched(name)}
        onChange={(date) => setFieldValue(name, date)}
        error={!!error}
        helperText={error}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </MuiPickersUtilsProvider>
  );
};

AppDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxDate: PropTypes.objectOf(PropTypes.any),
  className: PropTypes.string
};
AppDatePicker.defaultProps = {
  maxDate: null,
  className: '',
  label: ''
};

export default AppDatePicker;
