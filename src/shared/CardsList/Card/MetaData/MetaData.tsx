import React from 'react';
import styles from './metadata.css';

export function MetaData(): JSX.Element {
  return (
    <div className={styles.metaData}>
      <div className={styles.userLink}>
        <img
          className={styles.avatar}
          src="https://cdn.dribbble.com/users/393931/screenshots/16653235/media/bb99f541ffc0e71f3a4d6d68364865ea.png?compress=1&resize=200x200"
          alt="avatar"
        />
        <a href="#user-url" className={styles.username}>Dimon</a>
      </div>

      <span className={styles.createdAt}>
        <span className={styles.publishedLabel}>опубликовано </span>
        4 часа назад
      </span>
    </div>
  );
}
