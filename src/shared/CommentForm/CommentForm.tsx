import React, {ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import styles from './commentform.css';

interface ICommentForm {
  className?: string;
  author?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (event: FormEvent) => void;
  comment?: string;
}

function NOOP() {
  // do nothing
}

export function CommentForm(props: ICommentForm) {
  const {
    className=styles.form,
    author,
    onChange=NOOP,
    onSubmit=NOOP,
    comment=`${author}, ept `
  } = props;

  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.selectionStart = ref.current.value.length;
      ref.current.selectionEnd = ref.current.value.length;
    }
  },[])

  return (
    <form className={className} onSubmit={onSubmit}>
      <textarea className={styles.textarea} onChange={onChange} defaultValue={comment} ref={ref}/>
      <button className={styles.button} type={"submit"}>Комментировать</button>
    </form>
  );
}
