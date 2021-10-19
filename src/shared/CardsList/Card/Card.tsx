import React from 'react';
import styles from './card.css';
import { KarmaCounter } from './KarmaCounter';
import { CommentsButton } from './CommentsButton';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';

export function Card() {
  return (
    <li className={styles.card}>
      <div className={styles.textContent}>
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
        <h2 className={styles.title}>
          <a href="#post-url" className={styles.postLink}>
            Следует отметить, что новая модель организационной деятельности...
          </a>
        </h2>
      </div>

      <div className={styles.preview}>
        <img
          className={styles.previewImg}
          src="https://cdn.dribbble.com/users/3923578/screenshots/16649163/media/b14184fab233f1d9bdefde81cd592387.jpg?compress=1&resize=800x600"
        />
      </div>

      <div className={styles.menu}>
        <button className={styles.menuButton}>
          <svg width="5" height="20" viewBox="0 0 5 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9"/>
            <circle cx="2.5" cy="10" r="2.5" fill="#D9D9D9"/>
            <circle cx="2.5" cy="17.5" r="2.5" fill="#D9D9D9"/>
          </svg>
        </button>
      </div>

      <div className={styles.controls}>

        <KarmaCounter />
        <CommentsButton />

        <div className={styles.actions}>
          <ShareButton />
          <SaveButton />

        </div>
      </div>
    </li>
  );
}
