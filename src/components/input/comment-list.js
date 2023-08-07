import { Fragment } from "react";
import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props;
  return (
    <Fragment>
      {items.length && (
        <ul className={classes.comments}>
          {items.map((comment) => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <div>
                By <address>{comment.name}</address>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default CommentList;
