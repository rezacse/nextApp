import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppPrimaryBtn from '../buttons/AppPrimaryBtn';

const AppCustomSubmitButton = ({
  label,
  isFullWidth,
  customValue,
  clickHandler,
  ...rest
}) => {
  const { isValid, dirty, values } = useFormikContext();

  return (
    <AppPrimaryBtn
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      label={label}
      type="submit"
      isFullWidth={isFullWidth}
      isDisabled={!isValid || !dirty}
      clickHandler={() => clickHandler({ ...values, ...customValue })}
    />
  );
};

AppCustomSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  isFullWidth: PropTypes.bool,
  customValue: PropTypes.objectOf(PropTypes.any),
  clickHandler: PropTypes.func.isRequired
};

AppCustomSubmitButton.defaultProps = {
  isFullWidth: true,
  customValue: {}
};

export default AppCustomSubmitButton;
