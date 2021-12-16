import React, {useEffect, useState} from 'react';
import styles from './comments.css';
import {MetaData} from '../../CardsList/Card/MetaData';
import {CommentsButtonIcon} from '../../CardsList/Card/CommentsButton/CommentsButtonIcon';
import {CommentsButton} from '../../CardsList/Card/CommentsButton';
import {CommentForm} from '../../CommentForm';
import {ICommentsContextChildren, ICommentsContextData, ICommentsContextReplies} from '../../../hooks/useComments';
import {Break} from '../../Break';
import {CommentFormContainer} from '../../CommentFormContainer';

interface IComments{
  author?: string;
  createdAt?: number;
  body?: string;
  replies?: ICommentsContextData | string;
}
export function Comments({author, createdAt, body, replies}: IComments): JSX.Element {
  const [isCommentForm, setIsCommentForm] = useState(false);
  const [isReplies, setIsReplies] = useState(false);
  const [reply, setReply] = useState<Array<ICommentsContextChildren>>([]);
  useEffect(() => {
    if (typeof replies != 'string' && typeof replies != 'undefined') {
      if (typeof replies.data != 'undefined' && typeof replies.data?.children != 'undefined') {
        setIsReplies(true);
        setReply(replies.data.children);
      }
    } else {
      setIsReplies(false);
    }
  }, [replies])
  const handleClick = () => {
    setIsCommentForm(!isCommentForm);
  }
  return (
    <div className={styles.commentBody}>
      <MetaData author={author} createdAt={createdAt}/>
      <div className={styles.body}>
        <p>
          {body}
        </p>
      </div>
      <div onClick={handleClick} className={styles.commentsButtonContainer}>
        <CommentsButton userClassName={styles.commentBody}/>
        <Break size={4} inline={true} />
        Ответить
      </div>
      <div className={styles.componentForm} >
        {
          isCommentForm &&
            <CommentFormContainer author={author}/>
        }
      </div>
      {
        isReplies &&
          reply.map((item: ICommentsContextReplies) => {
            return <Comments
              key={item.data?.id}
              author={item.data?.author}
              createdAt={item?.data?.createdUtc}
              body={item.data?.body}
              replies={item.data?.replies}
            />
          })
      }
    </div>
  );
}
