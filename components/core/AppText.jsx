import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const AppText = ({ children, className }) => {
  return <Typography className={className}>{children}</Typography>;
};

AppText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};
AppText.defaultProps = {
  children: undefined,
  className: ''
};
export default AppText;
