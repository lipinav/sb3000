import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './title.css';
import { Posts } from '../../../Posts';
import {useComments} from '../../../../hooks/useComments';

interface ITitle {
  id?: string;
  title?: string;
  text?: string;
  author?: string;
}

export function Title({id, title, text, author}: ITitle): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [comments] = useComments(id);
  const [comment, setComment] = useState(`${author}, ept `);
  // console.log(`id: ${id} Comments: ${Object.keys(comments).length}`);

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
  }
  return (
    <h2 className={styles.text}>
      <a href="#post-url" className={styles.postLink} onClick={() => setIsModalOpened(true)}>
        {title}
        {/*Следует отметить, что новая модель организационной деятельности...*/}
      </a>
      {
        isModalOpened &&
        <Posts
          title={title}
          text={text}
          comments={comments}
          onClose={() => setIsModalOpened(false)}
          author={author}
          onCommentChange={handleCommentChange}
          comment={comment}
        />
      }
    </h2>
  );
}
