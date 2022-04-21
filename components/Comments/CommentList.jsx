import classes from './commentList.module.css';

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((c) => (
        <li key={c._id}>
          <p>{c.comment}</p>
          <div>
            By <address>{c.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
