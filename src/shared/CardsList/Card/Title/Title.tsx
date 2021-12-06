import React, {useEffect, useState} from 'react';
import styles from './title.css';
import { Posts } from '../../../Posts';
import {useComments} from '../../../../hooks/useComments';

interface ITitle {
  id?: string;
  title?: string;
  text?: string;
}

export function Title({id, title, text}: ITitle): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [comments] = useComments(id);
  console.log(`id: ${id} Comments: ${comments?.length}`);

  return (
    <h2 className={styles.text}>
      <a href="#post-url" className={styles.postLink} onClick={() => setIsModalOpened(true)}>
        {title}
        {/*Следует отметить, что новая модель организационной деятельности...*/}
      </a>
      {
        isModalOpened &&
        <Posts title={title} text={text} comments={comments} onClose={() => setIsModalOpened(false)}/>
      }
    </h2>
  );
}
