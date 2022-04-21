import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import AppText from '../core/AppText';

const styles = makeStyles((theme) => ({
  root: {
    color: theme.palette.red
  }
}));

const AppErrorMessage = ({ error, visible }) => {
  const classes = styles();
  if (!error || !visible) return null;

  return <AppText className={classes.root}>{error}</AppText>;
};

AppErrorMessage.propTypes = {
  error: PropTypes.string,
  visible: PropTypes.bool
};
AppErrorMessage.defaultProps = {
  error: '',
  visible: false
};

export default AppErrorMessage;
