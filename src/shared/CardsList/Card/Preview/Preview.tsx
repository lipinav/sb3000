import React from 'react';
import styles from './preview.css';

export function Preview() {
  return (
    <div className={styles.preview}>
      <img
        className={styles.previewImg}
        src="https://cdn.dribbble.com/users/3923578/screenshots/16649163/media/b14184fab233f1d9bdefde81cd592387.jpg?compress=1&resize=800x600"
      />
    </div>
  );
}
