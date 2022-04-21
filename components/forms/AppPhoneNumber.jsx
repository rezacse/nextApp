import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

import { FormLabel } from '@material-ui/core';
import AppFormField from './AppFormField';
import AppFormPicker from './AppFormPicker';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-selectMenu': {
      // height: '100%'
    }
  },
  phoneCode: {
    width: '130px',
    marginRight: '8px !important'
    // [theme.breakpoints.down('md')]: {
    //   marginTop: '110px'
    // }
  },
  errorMsg: {
    color: theme.palette.red,
    fontSize: '11px',
    minHeight: '1em',
    fontWeight: '400',
    lineHeight: '1em',
    letterSpacing: '0.33px',
    margin: '8px 14px 0',
    fontFamily: 'Roboto'
  }
}));

const AppPhoneNumber = ({
  label,
  phoneCodeName,
  phoneNumberName,
  options,
  className,
  margin
}) => {
  const classes = useStyles();

  // const handleChanged = (event) => {
  //   event.persist();
  //   changeHandler(event);
  // };

  return (
    <div className={clsx(classes.root, className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <div className="df">
        <AppFormPicker
          name={phoneCodeName}
          options={options}
          className={classes.phoneCode}
          placeholder=""
          margin={margin}
        />
        <AppFormField
          name={phoneNumberName}
          placeholder=""
          type="tel"
          margin={margin}
        />
      </div>
    </div>
  );
};

AppPhoneNumber.propTypes = {
  label: PropTypes.string,
  phoneCodeName: PropTypes.string.isRequired,
  phoneNumberName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
  margin: PropTypes.string
};

AppPhoneNumber.defaultProps = {
  options: [],
  label: '',
  className: '',
  margin: ''
};
export default AppPhoneNumber;
