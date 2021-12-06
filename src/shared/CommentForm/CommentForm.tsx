import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './commentform.css';

export function CommentForm() {
  const [value, setValue] = useState('');
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea className={styles.textarea} onChange={handleChange}/>
      <button className={styles.button} type={"submit"}>Комментировать</button>
    </form>
  );
}
