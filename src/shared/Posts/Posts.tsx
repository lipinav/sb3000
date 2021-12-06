/*eslint-env es6*/
import React, {useEffect, useRef, useState} from 'react';
import styles from './posts.css';
import retryTimes = jest.retryTimes;
import ReactDOM from 'react-dom';
// import {CommentsButtonIcon} from '../CardsList/Card/CommentsButton/CommentsButtonIcon';
import {CommentForm} from '../CommentForm';

interface IPosts {
  title?: string;
  text?: string;
  onClose?: () => void;
}

function NOOP() {
  // do nothing
}
export function Posts({title, text, onClose = NOOP}: IPosts): JSX.Element {
  const [isTitle, setIsTitle] = useState(false);
  const [isText, setIsText] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTitle(typeof title !== 'undefined');
  }, [title]);
  useEffect(() => {
    setIsText(typeof text !== 'undefined');
  }, [text]);

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

  return ReactDOM.createPortal((
    <div ref={ref}>
      <h2>
        {isTitle ? title : 'Title'}
      </h2>
      <div>
        <p>
          {isText ? text : 'Text'}
        </p>
      </div>
      <CommentForm />
    </div>
  ), node);
}