/*eslint-env es6*/
import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import styles from './posts.css';
import ReactDOM from 'react-dom';
import {
  ICommentsContextChildren,
  ICommentsContextData,
  ICommentsContextReplies,
  useComments
} from '../../hooks/useComments';
import {Comments} from './Comments';
import {CommentFormContainer} from '../CommentFormContainer';
import {useHistory, useParams} from 'react-router-dom';
import {postsContext} from '../context/postsContext';

interface IPosts {
  title?: string;
  text?: string;
  comments?: ICommentsContextData | string;
  onClose?: () => void;
  author?: string;
  onCommentChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  comment?: string;
}

export function Posts(): JSX.Element {
  const [isTitle, setIsTitle] = useState(false);
  const [isText, setIsText] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isReplies, setIsReplies] = useState(false);
  const [reply, setReply] = useState<Array<ICommentsContextChildren>>([]);
  const history = useHistory();
  const [posts] = useContext(postsContext);
  const {id} = useParams<{id: string}>();
  const [comments] = useComments(id);

  console.group('src/shared/Posts/Posts.tsx');
  // save for future
  // const post = R.find(R.whereEq({id: id}), posts.children);
  const post = posts.byIds[id];
  console.log(`id: ${id}`);
  console.log(`posts: ${posts.children.length}`);
  console.log(`post: ${typeof post}`);
  // console.log(`title: ${title} text: ${text} author: ${author}`);
  let title;
  let text;
  let author;
  useEffect(() => {
    if (typeof post !== 'undefined') {
      [title, text, author] = [post.title, post.selftext, post.author];
      setIsTitle(typeof title !== 'undefined');
      setIsText(typeof text !== 'undefined');
    }
  }, [post]);

  useEffect(() => {
    if (typeof comments !== 'string' && typeof comments !== 'undefined') {
      if (typeof comments.data !== 'undefined' && typeof comments.data?.children !== 'undefined') {
        setIsReplies(true);
        setReply(comments.data.children);
      }
    } else {
      setIsReplies(false);
    }
  }, [comments]);

  // console.log(`isComments: ${isComments}`);
  console.log(`comments: ${JSON.stringify(comments)}`);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        history.push('/posts');
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

   const node = document.querySelector('#modal_root');
   if (!node) return <></>;

  // console.groupEnd();
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
          <CommentFormContainer author={author}/>
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
