import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';

const { REACT_APP_RE_CAPTCHA_KEY: reCaptchaSiteKey } = process.env;
const AppRobotCheck = ({ className, name }) => {
  const { setFieldValue } = useFormikContext();

  const onReCaptchaChange = (value) => {
    setFieldValue(name, !!value);
  };

  return (
    <ReCAPTCHA
      className={className}
      sitekey={reCaptchaSiteKey}
      onExpired={() => onReCaptchaChange()}
      onErrored={() => onReCaptchaChange()}
      onChange={onReCaptchaChange}
    />
  );
};

AppRobotCheck.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired
};

AppRobotCheck.defaultProps = {
  className: ''
};

export default AppRobotCheck;
