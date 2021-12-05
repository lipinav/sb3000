import React from 'react';
import styles from './metadata.css';

interface IMetaData {
    avatar?: string;
    author?: string;
    createdAt?: number;
}
export function MetaData({avatar, author, createdAt}: IMetaData): JSX.Element {

  let avatarImage;
  let authorA;
  let createdAtSpan;
  if (avatar && author) {
    const avatarUrl = new URL(avatar);
    const avatarIcon = avatarUrl.origin+avatarUrl.pathname;
    avatarImage = <img
                    className={styles.avatar}
                    src={avatarIcon}
                    alt={author}
                  />;
  } else {
    avatarImage = <img
                    className={styles.avatar}
                    src="https://cdn.dribbble.com/users/393931/screenshots/16653235/media/bb99f541ffc0e71f3a4d6d68364865ea.png?compress=1&resize=200x200"
                    alt="avatar"
                  />
  }
  if (author) {
    authorA = <a href="#user-url" className={styles.username}>{author}</a>;
  } else {
    authorA = <a href="#user-url" className={styles.username}>Dimon</a>;
  }
  if (createdAt) {
    createdAtSpan = <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>опубликовано </span>
            {createdAt}
          </span>;
  } else {
    createdAtSpan = <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>опубликовано </span>
             {"4 часа назад"}
          </span>;
  }
  return (
    <div className={styles.metaData}>
      <div className={styles.userLink}>
        {avatarImage}
        {authorA}
      </div>
        {createdAtSpan}
    </div>
  );
}