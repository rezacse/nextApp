import { useEffect, useState } from 'react';
import axios from 'axios';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './comments.module.css';
import AppPrimaryBtn from '../core/AppPrimaryBtn';

function Comments({ eventID }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const resp = await axios.get(`/api/comments/${eventID}`);
    console.log(resp);

    setComments([...resp.data.comments]);
  };

  useEffect(() => {
    if (showComments) getComments();
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData) => {
    const data = { ...commentData, eventID: eventID };
    const resp = await axios.post(`/api/comments/${eventID}`, data);
    console.log(resp);

    // send data to API
  };

  return (
    <section className={classes.comments}>
      <AppPrimaryBtn
        clickHandler={toggleCommentsHandler}
        label={`${showComments ? 'Hide' : 'Show'} Comments`}
      />
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
