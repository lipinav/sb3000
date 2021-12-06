import React, {useState} from 'react';
import styles from './comments.css';
import {MetaData} from '../../CardsList/Card/MetaData';
import {CommentsButtonIcon} from '../../CardsList/Card/CommentsButton/CommentsButtonIcon';
import {CommentsButton} from '../../CardsList/Card/CommentsButton';
import {CommentForm} from '../../CommentForm';

interface IComments{
  author?: string;
  createdAt?: number;
  body?: string;
}
export function Comments({author, createdAt, body}: IComments): JSX.Element {
  const [isCommentForm, setIsCommentForm] = useState(false);
  const handleClick = () => {
    return setIsCommentForm(!isCommentForm);
  }
  return (
    <div>
      <MetaData author={author} createdAt={createdAt}/>
      <p>
        {body}
      </p>
      <CommentsButton onClick={() => handleClick}/>
      {
        isCommentForm &&
          <CommentForm />
      }
    </div>
  );
}
