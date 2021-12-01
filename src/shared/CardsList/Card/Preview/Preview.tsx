import React from 'react';
import styles from './preview.css';

interface IPreview {
    cardImg?: string;
}
export function Preview({cardImg}: IPreview): JSX.Element {
  let image;
  if (cardImg && cardImg !== 'default' && cardImg !== 'self' && cardImg !== 'nsfw' ) {
    image = <img
              className={styles.previewImg}
              src={cardImg}
            />;
  } else {
    image = <img
              className={styles.previewImg}
              src="https://cdn.dribbble.com/users/3923578/screenshots/16649163/media/b14184fab233f1d9bdefde81cd592387.jpg?compress=1&resize=800x600"
            />;
  }
  return (
    <div className={styles.preview}>
      {image}
    </div>
  );
}
