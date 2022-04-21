import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
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
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import bytesToSize from '../../helpers/bytesToSize';
import { getFileInfo } from '../../helpers/fileHelper';

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(1),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: colors.grey[50],
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.5
  },
  info: {
    marginTop: theme.spacing(1)
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

const AppFilesPicker = ({
  className,
  label,
  placeholder,
  maxNoOfFile,
  files,
  onChange
}) => {
  const classes = useStyles();
  const {
    // setFieldTouched,
    handleChange
    // errors,
    // touched,
    // values
  } = useFormikContext();
  // const error = touched[name] ? errors[name] : undefined;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      if (acceptedFiles.length + files.length > maxNoOfFile) {
        // eslint-disable-next-line no-alert
        alert(`Maximum number of file accepted : ${maxNoOfFile}`);
        return;
      }

      acceptedFiles.forEach((file) => {
        getFileInfo(file, handleChange);
      });
    },
    [files.length, maxNoOfFile, handleChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ['image/*'],
    maxSize: 5242880,
    onDrop: handleDrop
  });

  const removeFile = (file) => {
    const index = files.indexOf(file);
    files.splice(index, 1);

    onChange(file.name, true);
  };

  return (
    <div className={clsx(classes.root, className)}>
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
        <div>
          <Typography gutterBottom variant="h3">
            {label}
          </Typography>
          <Typography
            className={classes.info}
            color="textSecondary"
            variant="body1"
          >
            {placeholder}
          </Typography>
        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={uuid()}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.fileName}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.fileContent.length)}
                  />
                  <Button onClick={() => removeFile(file)} size="small">
                    <DeleteIcon />
                  </Button>
                </ListItem>
              ))}
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

AppFilesPicker.propTypes = {
  className: PropTypes.string,
  maxNoOfFile: PropTypes.number,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.number,
  files: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired
};

AppFilesPicker.defaultProps = {
  className: '',
  maxNoOfFile: 1,
  files: [],
  placeholder: 'Drop files here or click to browse thorough your machine'
};

export default AppFilesPicker;
