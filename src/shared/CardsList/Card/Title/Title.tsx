import React from 'react';
import styles from './title.css';

interface ITitle {
  title: string;
}

export function Title(props: ITitle): JSX.Element {
  return (
    <h2 className={styles.title}>
      <a href="#post-url" className={styles.postLink}>
        {props.title}
        {/*Следует отметить, что новая модель организационной деятельности...*/}
      </a>
    </h2>
  );
}
