import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 120,
    // marginTop: '16px',
    display: 'flex',
    '& .MuiSelect-select': {
      display: 'flex'
    },
    '& img': {
      width: '24px',
      height: '20px',
      marginRight: '8px',
      marginBottom: '-5px'
    },
    '& .MuiOutlinedInput-marginDense': {
      lineHeight: '0.92em',
      '& .MuiTypography-body1': {
        fontSize: '14px',
        lineHeight: '14px'
      },
      '& img': {
        width: '24px',
        height: '20px',
        marginRight: '8px',
        marginBottom: '-1px',
        marginTop: '-4px'
      }
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  icon: {
    width: '24px',
    height: '20px',
    marginRight: '8px',
    marginBottom: '-5px'
  },
  iconAtPopup: {
    maxWidth: '24px',
    marginRight: '10px'
  },
  iconDense: {},
  text: {
    lineHeight: '15px'
  }
}));

const AppSelect = ({
  name,
  label,
  value,
  options,
  defaultValue,
  defaultTitle,
  changeHandler,
  isDisabled,
  error,
  className,
  placeholder
}) => {
  const classes = useStyles();
  const { t: translator } = useTranslation();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChanged = (event) => {
    event.persist();
    changeHandler(event);
  };

  return (
    <FormControl
      margin="dense"
      variant="outlined"
      className={clsx(classes.root, className)}
    >
      <InputLabel ref={inputLabel} id={label}>
        {label}
      </InputLabel>
      <Select
        disabled={isDisabled}
        labelId={label}
        name={name}
        value={value}
        onChange={handleChanged}
        labelWidth={labelWidth}
        error={error}
        displayEmpty
        renderValue={
          !value && placeholder ? () => <span>{placeholder}</span> : undefined
        }
      >
        {defaultValue !== undefined && (
          <MenuItem value={defaultValue}>
            <em>{defaultTitle}</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.icon && (
              <img className={classes.iconAtPopup} src={option.icon} alt="" />
            )}

            <Typography
              className={classes.text}
              dangerouslySetInnerHTML={{
                __html: translator(option.text)
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

AppSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  changeHandler: PropTypes.func.isRequired,
  label: PropTypes.string,
  defaultTitle: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  error: PropTypes.bool,
  className: PropTypes.string
};
AppSelect.defaultProps = {
  defaultTitle: '',
  label: '',
  value: '',
  placeholder: '',
  defaultValue: undefined,
  isDisabled: false,
  error: false,
  className: '',
  options: []
};

export default AppSelect;
