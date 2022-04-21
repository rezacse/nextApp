import * as Yup from 'yup';

import { AppForm, AppFormField, AppSubmitButton } from '../../components/forms';
import classes from './newComment.module.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  name: Yup.string().required().label('Name'),
  comment: Yup.string().required().label('Comment')
});

function NewComment({ onAddComment }) {
  const submitHandler = (values) => {
    onAddComment(values);
  };

  return (
    <AppForm
      initValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        submitHandler(values);
      }}
      className={classes.form}
    >
      <AppFormField name="email" placeholder="Enter your email" />
      <AppFormField name="name" placeholder="Enter your name" />
      <AppFormField name="comment" placeholder="Enter your comment" />

      <AppSubmitButton
        label="Add Comment"
        className={classes.submitBtn}
        isFullWidth={false}
      />
    </AppForm>
  );
}

export default NewComment;
