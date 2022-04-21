import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { useFormikContext } from 'formik';

import makeStyles from '@material-ui/styles/makeStyles';
import { colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
import PublishIcon from '@material-ui/icons/Publish';

import CloseCtrl from '../ctrl/CloseCtrl';
import cHelper from '../../configs/contentConfig';
import fileHelper, { getImgInfo } from '../../helpers/fileHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiListItem-root': {
      padding: 0
    }
  },
  dropZone: {
    border: theme.palette.border.default,
    borderRadius: '4px',
    padding: '4px 14px',
    outline: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '10px',
    color: theme.palette.placeholder.primary,
    backgroundColor: theme.palette.background.input,
    '&:hover': {
      // border: `1px solid ${theme.palette.white}`,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: colors.grey[50],
    opacity: 0.7
  },
  placeholder: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  info: {
    alignSelf: 'center',
    fontSize: '12px',
    color: theme.palette.black
  },
  previewItem: {
    position: 'relative',
    width: '150px',
    marginTop: '10px'
  },
  mediaPreview: {
    width: '100%',
    borderRadius: '5px',
    border: theme.palette.border.default
  },
  closeIcon: {
    position: 'absolute',
    top: '-16px',
    right: '-10px'
  }
}));

const AppImgPicker = ({ className, name, label, placeholder }) => {
  const classes = useStyles();
  const { setFieldValue, values } = useFormikContext();

  const handleDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    acceptedFiles.forEach((file) => {
      getImgInfo(file, (data) => {
        setFieldValue(name, data);
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: fileHelper.getAcceptFiles(cHelper.MEDIA_TYPE.IMG),
    maxSize: fileHelper.getMaxFileSize(cHelper.MEDIA_TYPE.IMG),
    onDrop: handleDrop
  });

  const removeFile = () => {
    setFieldValue(name, null);
  };

  return (
    <div className={clsx(classes.root, className)}>
      {label && <FormLabel>{label}</FormLabel>}
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
        <div className={classes.previewItem}>
          <img alt="" src={values[name].url} className={classes.mediaPreview} />

          <CloseCtrl
            className={classes.closeIcon}
            id={values[name].url}
            clickHandler={removeFile}
          />
        </div>
      )}
    </div>
  );
};

AppImgPicker.propTypes = {
  className: PropTypes.string,
  maxNoOfFile: PropTypes.number,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.any)
};

AppImgPicker.defaultProps = {
  className: '',
  maxNoOfFile: 1,
  label: '',
  files: [],
  placeholder: 'Drop files here or click to browse thorough your machine'
};

export default AppImgPicker;
