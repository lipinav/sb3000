import React, {useEffect, useState} from 'react';
import styles from './title.css';
import { Posts } from '../../../Posts';

interface ITitle {
  title?: string;
  text?: string;
}

export function Title({title, text}: ITitle): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <h2 className={styles.text}>
      <a href="#post-url" className={styles.postLink} onClick={() => setIsModalOpened(true)}>
        {title}
        {/*Следует отметить, что новая модель организационной деятельности...*/}
      </a>
      {
        isModalOpened &&
        <Posts title={title} text={text} onClose={() => setIsModalOpened(false)}/>
      }
    </h2>
  );
}
