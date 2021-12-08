import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import styles from './commentform.css';

interface ICommmentForm {
  className?: string;
  author?: string;
  onCommentChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  comment?: string;
}

function NOOP() {
  // do nothing
}

export function CommentForm(props: ICommmentForm) {
  const {
    className=styles.form,
    author,
    onCommentChange=NOOP,
    comment=`${author}, ept `
  } = props;
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
      ref.current.selectionEnd = ref.current.value.length;
    }
  },[])
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(comment);
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <textarea className={styles.textarea} onChange={onCommentChange} defaultValue={comment} ref={ref}/>
      <button className={styles.button} type={"submit"}>Комментировать</button>
    </form>
  );
}
