/*eslint-env es6*/
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './posts.css';
import retryTimes = jest.retryTimes;
import ReactDOM from 'react-dom';
// import {CommentsButtonIcon} from '../CardsList/Card/CommentsButton/CommentsButtonIcon';
import {CommentForm} from '../CommentForm';
import {ICommentsContextChildren, ICommentsContextData, ICommentsContextReplies} from '../../hooks/useComments';
import {Comments} from './Comments';

interface IPosts {
  title?: string;
  text?: string;
  comments?: ICommentsContextData | string;
  onClose?: () => void;
  author?: string;
  onCommentChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  comment?: string;
}

function NOOP() {
  // do nothing
}
export function Posts({title, text, comments, onClose = NOOP, author, onCommentChange=NOOP, comment}: IPosts): JSX.Element {
  const [isTitle, setIsTitle] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isReplies, setIsReplies] = useState(false);
  const [reply, setReply] = useState<Array<ICommentsContextChildren>>([]);
  console.group('src/shared/Posts/Posts.tsx');

  useEffect(() => {
    setIsTitle(typeof title !== 'undefined');
  }, [title]);
  useEffect(() => {
    setIsText(typeof text !== 'undefined');
  }, [text]);
  useEffect(() => {
    if (typeof comments != 'string' && typeof comments != 'undefined') {
      if (typeof comments.data != 'undefined' && typeof comments.data?.children != 'undefined') {
        setIsReplies(true);
        setReply(comments.data.children);
      }
    } else {
      setIsReplies(false);
    }
    // setIsComments(typeof comments != 'undefined' && typeof comments != 'string');
  }, [comments]);

  console.log(`isComments: ${isComments}`);
  console.log(`reply: ${reply.length}`);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  const node = document.querySelector('#modal_root');
  if (!node) return <></>;

  console.groupEnd();
  return ReactDOM.createPortal((
    <div className={styles.container}>
      <div className={styles.containerInner} ref={ref}>
        <h2 className={styles.title}>
          {isTitle ? title : 'Title'}
        </h2>
        <div className={styles.text}>
          <p>
            {isText ? text : 'Text'}
          </p>
        </div>
        <div className={styles.commentForm}>
          <CommentForm author={author} onCommentChange={onCommentChange} comment={comment}/>
        </div>
        {isReplies &&
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
    </div>
  ), node);
}
