import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useFormikContext } from 'formik';

import makeStyles from '@material-ui/styles/makeStyles';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';

import bytesToSize from '../../helpers/bytesToSize';
import { getFileInfo } from '../../helpers/fileHelper';

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: theme.palette.border.default,
    borderRadius: '4px',
    padding: '4px 14px',
    outline: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '4px',
    color: theme.palette.placeholder.primary,
    backgroundColor: theme.palette.background.input,
    '&:hover': {
      border: `1px solid ${theme.palette.white}`,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  placeholder: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  info: {
    alignSelf: 'center',
    color: theme.palette.placeholder.primary
  },
  svg: {
    alignSelf: 'center'
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const AppFilePicker = ({ className, name, label, placeholder }) => {
  const classes = useStyles();
  const {
    // setFieldTouched,
    setFieldValue,

    // errors,
    // touched,
    values
  } = useFormikContext();
  // const error = touched[name] ? errors[name] : undefined;

  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    acceptedFiles.forEach((file) => {
      getFileInfo(file, (data) => {
        setFieldValue(name, data);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/*'],
    maxSize: 5242880,
    onDrop: handleDrop
  });

  const removeFile = () => {
    setFieldValue(name, null);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <FormLabel>{label}</FormLabel>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...getRootProps()}
      >
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getInputProps()}
        />
        <div className={classes.placeholder}>
          <Typography className={classes.info}>{placeholder}</Typography>
          <PublishIcon className={classes.svg} color="secondary" />
        </div>
      </div>
      {values[name] && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              <ListItem>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={values[name].fileName}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={bytesToSize(values[name].size)}
                />
                <Button onClick={removeFile} size="small">
                  <DeleteIcon />
                </Button>
              </ListItem>
            </List>
          </PerfectScrollbar>
          {/* <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

AppFilePicker.propTypes = {
  className: PropTypes.string,
  maxNoOfFile: PropTypes.number,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.any)
};

AppFilePicker.defaultProps = {
  className: '',
  maxNoOfFile: 1,
  files: [],
  placeholder: 'Drop files here or click to browse thorough your machine'
};

export default AppFilePicker;
