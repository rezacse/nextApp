import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { FormLabel } from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab/useAutocomplete';

const useStyles = makeStyles((theme) => ({
  option: {
    color: theme.palette.black,
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
}));

const AppCountryPicker = ({
  label,
  name,
  options,
  className,
  isDisabled,
  margin
}) => {
  const classes = useStyles();
  const {
    setFieldTouched,
    setFieldValue,
    setValues,
    errors,
    touched
  } = useFormikContext();
  const error = touched[name] ? errors[name] : undefined;

  const handleSelection = (event, option) => {
    event.preventDefault();
    // const evt = {
    //   target: {
    //     name,
    //     value: option ? option.value : 0
    //   }
    // };
    // changeHandler(evt);
    setFieldValue();
    setValues((v) => ({
      ...v,
      [name]: option ? option.value : 0,
      phoneCodeCountryID: option ? option.value : 0
    }));
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.text
  });

  const getOptionHtml = (option) => {
    return (
      <>
        <img src={option.flagUrl} width="24px" alt="country" className="mr1" />
        {option.text}
      </>
    );
  };

  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <Autocomplete
        autoHighlight
        className={className}
        id="country-select-demo"
        // style={{ width: '100%' }}
        classes={{ option: classes.option }}
        options={options}
        // value={values[name] || undefined}
        filterOptions={filterOptions}
        disabled={isDisabled}
        getOptionLabel={(option) => option.text}
        renderOption={(option) => getOptionHtml(option)}
        onBlur={() => setFieldTouched(name)}
        onChange={handleSelection}
        renderInput={(params) => (
          <>
            <TextField
              fullWidth
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              margin={margin}
              variant="outlined"
              disabled={isDisabled}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-country'
              }}
              placeholder="Country"
              error={!!error}
              helperText={error}
            />
          </>
        )}
      />
    </>
  );
};

AppCountryPicker.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  margin: PropTypes.string,
  className: PropTypes.string
};

AppCountryPicker.defaultProps = {
  className: '',
  label: '',
  isDisabled: false,
  isFullWidth: false,
  margin: 'dense'
};

export default AppCountryPicker;
