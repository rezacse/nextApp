import classes from './registration.module.css';
import * as Yup from 'yup';
import axios from 'axios';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import { useContext } from 'react';
import NotificationContext from '../../store/NotificationContext';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email')
});

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);

  const submitHandler = async (values) => {
    try {
      const data = { email: values.email };
      const resp = await axios.post('/api/newsletter', data);

      notificationCtx.show({
        title: 'Success!',
        message: resp.data.message,
        status: 'success'
      });
    } catch (error) {
      console.log(error);
      notificationCtx.show({
        title: 'Error!',
        message: error.message,
        status: 'error'
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <AppForm
        initValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          submitHandler(values);
        }}
        className={classes.root}
      >
        <AppFormField name="email" placeholder="Enter your email" />

        <AppSubmitButton
          label="Register"
          className={classes.submitBtn}
          isFullWidth={false}
        />
      </AppForm>
    </section>
  );
}

export default NewsletterRegistration;
