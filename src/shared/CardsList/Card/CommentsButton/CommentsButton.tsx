import React from 'react';
import styles from './commentsbutton.css';
import { CommentsButtonIcon } from './CommentsButtonIcon';

export function CommentsButton(): JSX.Element {
  return (
    <button className={styles.commentsButton}>
      <CommentsButtonIcon />
      <span className={styles.commentsText}>13</span>
    </button>
  );
}
