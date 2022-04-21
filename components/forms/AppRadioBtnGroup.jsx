import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  formGroup: {
    flexDirection: 'row'
  },
  formControl: {
    margin: '0'
  },
  texts: {
    fontSize: '12px !important'
  }
}));

const AppRadioBtnGroup = ({ fieldName, label, items, clearFieldName }) => {
  const { setValues, errors, touched, values, initialValues } =
    useFormikContext();
  const error = touched[fieldName] ? errors[fieldName] : undefined;

  const classes = useStyles();

  // useEffect(() => {
  //   if (changeHandler) changeHandler(values);
  // }, [values[name]]);

  const onChanged = (evt) => {
    if (!evt || !evt.target) return;
    const value = parseInt(evt.target.value, 10);
    // setFieldValue(name, value);
    // setFieldValue(clearFieldName, initialValues[clearFieldName]);
    values[fieldName] = value;
    if (clearFieldName) values[clearFieldName] = initialValues[clearFieldName];

    setValues(values, true);
  };

  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        {label && <FormLabel>{label}</FormLabel>}
        <RadioGroup
          id="app-radio"
          className={classes.formGroup}
          name={fieldName}
          value={values[fieldName]}
          onChange={onChanged}
        >
          {items.map((o) => (
            <FormControlLabel
              key={o.value}
              label={translator(o.text)}
              value={o.value}
              className={classes.texts}
              control={<Radio />}
            />
          ))}

          {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
        </RadioGroup>
        {error && <p className="formError w100p ml2">{error}</p>}
      </FormControl>
    </>
  );
};

AppRadioBtnGroup.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearFieldName: PropTypes.string
};
AppRadioBtnGroup.defaultProps = {
  clearFieldName: '',
  label: ''
};

export default AppRadioBtnGroup;
