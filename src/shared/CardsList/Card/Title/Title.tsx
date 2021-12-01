import React from 'react';
import styles from './title.css';

interface ITitle {
  text?: string;
}

export function Title(props: ITitle): JSX.Element {
  return (
    <h2 className={styles.text}>
      <a href="#post-url" className={styles.postLink}>
        {props.text}
        {/*Следует отметить, что новая модель организационной деятельности...*/}
      </a>
    </h2>
  );
}
