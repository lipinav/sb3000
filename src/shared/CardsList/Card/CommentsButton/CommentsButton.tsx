import React from 'react';
import styles from './commentsbutton.css';
import { CommentsButtonIcon } from './CommentsButtonIcon';
import {constructN} from 'ramda';

interface ICommentsButton {
  numComments?: number;
  onClick?: () => void;
  userClassName?: string;
}
function NOOP() {
  // do nothing
}
export function CommentsButton({numComments, onClick=NOOP, userClassName=styles.commentsButton}: ICommentsButton): JSX.Element {
  let commentsSpan;
  if (numComments) {
    commentsSpan = <span className={styles.commentsText}>{numComments}</span>;
  } else {
    commentsSpan = <span className={styles.commentsText}>13</span>;
  }
  return (
    <button className={userClassName} onClick={() => onClick}>
      <CommentsButtonIcon />
      {commentsSpan}
    </button>
  );
}
