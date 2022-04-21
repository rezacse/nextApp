import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const AppPrimaryBtn = ({
  label,
  type,
  clickHandler,
  isDisabled,
  isFullWidth,
  className,
  children
}) => {
  const handleClick = (event) => {
    if (event) event.preventDefault();
    if (clickHandler) clickHandler(event);
  };

  return (
    <Button
      color="secondary"
      variant="contained"
      type={type}
      fullWidth={isFullWidth}
      className={className}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {label || children}
    </Button>
  );
};

AppPrimaryBtn.propTypes = {
  className: PropTypes.string,
  isFullWidth: PropTypes.bool,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.node,
  clickHandler: PropTypes.func.isRequired
};

AppPrimaryBtn.defaultProps = {
  label: '',
  children: '',
  className: '',
  isFullWidth: false,
  type: 'button',
  isDisabled: false
};

export default AppPrimaryBtn;
