import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import styles from './title.css';
import { Posts } from '../../../Posts';
import {useComments} from '../../../../hooks/useComments';
import {Link} from 'react-router-dom';

interface ITitle {
  id?: string;
  title?: string;
  text?: string;
  author?: string;
}

export function Title({id, title}: ITitle): JSX.Element {

  return (
    <h2 className={styles.text}>
      <Link to={`/posts/${id}`} className={styles.postLink}>
        {title}
      </Link>
    </h2>
  );
}
