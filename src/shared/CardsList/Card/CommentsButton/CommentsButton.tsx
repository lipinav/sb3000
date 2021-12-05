import React from 'react';
import styles from './commentsbutton.css';
import { CommentsButtonIcon } from './CommentsButtonIcon';
import {constructN} from 'ramda';

interface ICommentsButton {
  numComments?: number;
}
export function CommentsButton({numComments}: ICommentsButton): JSX.Element {
  let commentsSpan;
  if (numComments) {
    commentsSpan = <span className={styles.commentsText}>{numComments}</span>;
  } else {
    commentsSpan = <span className={styles.commentsText}>13</span>;
  }
  return (
    <button className={styles.commentsButton}>
      <CommentsButtonIcon />
      {commentsSpan}
    </button>
  );
}
