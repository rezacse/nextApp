import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import AppPrimaryBtn from '../core/AppPrimaryBtn';

const AppSubmitButton = ({ label, isFullWidth, ...rest }) => {
  const { isValid, dirty, handleSubmit } = useFormikContext();

  return (
    <AppPrimaryBtn
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      label={label}
      type="submit"
      isFullWidth={isFullWidth}
      isDisabled={!isValid || !dirty}
      clickHandler={() => {
        handleSubmit();
      }}
    />
  );
};

AppSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  isFullWidth: PropTypes.bool
};

AppSubmitButton.defaultProps = {
  isFullWidth: true
};

export default AppSubmitButton;
