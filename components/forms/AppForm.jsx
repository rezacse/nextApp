import PropTypes from 'prop-types';
import { Formik } from 'formik';

const AppForm = ({
  initValues,
  children,
  onSubmit,
  validationSchema,
  onReset,
  onFormChange,
  enableReinitialize,
  className
}) => {
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      onReset={onReset}
      enableReinitialize={enableReinitialize}
    >
      {({ values }) => (
        <form className={className}>
          {onFormChange && onFormChange(values)}
          {children}
        </form>
      )}
    </Formik>
  );
};

AppForm.propTypes = {
  initValues: PropTypes.objectOf(PropTypes.any).isRequired,
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.objectOf(PropTypes.any),
  onReset: PropTypes.func,
  onFormChange: PropTypes.func,
  enableReinitialize: PropTypes.bool,
  className: PropTypes.string
};

AppForm.defaultProps = {
  children: undefined,
  validationSchema: {},
  onReset: () => {},
  onFormChange: () => {},
  enableReinitialize: false,
  className: ''
};
export default AppForm;
