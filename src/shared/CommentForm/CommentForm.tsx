import React, {ChangeEvent, FormEvent, useEffect, useRef} from 'react';
import styles from './commentform.css';
import {intersection} from 'ramda';
import {SubmitHandler, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {updateComment} from '../../store/reducer';
import { DevTool } from "@hookform/devtools";

interface ICommentForm {
  className?: string;
  author?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (value: ICommentValue) => void;
  comment: {comment: string};
}
export interface ICommentValue {
  comment: string;
}
interface ICommentError {
  comment: string;
}
function NOOP() {
  // do nothing
}
const validate = (values: ICommentValue) => {
  const errors: ICommentError = {comment: ''};
  if (values.comment.length === 0) errors.comment = 'Comment empty! White something, NOW!';
  return errors;
}
export function CommentForm(props: ICommentForm) {
  const {
    className=styles.form,
    author,
    onChange=NOOP,
    onSubmit=NOOP,
    comment,
    // comment={comment: `${author}, ept `},
  } = props;

  console.log(`old comment: ${typeof comment}: ${JSON.stringify(comment)} ${comment}`);
  const {
    setValue,
    control,
    setFocus,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ICommentValue>({defaultValues: comment, reValidateMode: 'onChange'});

  const onSubmitForm: SubmitHandler<ICommentValue> = comment => onSubmit(comment);
  useEffect(() => {
    setFocus('comment');
  }, [setFocus])

  return (
    <>
      <form className={className} onSubmit={handleSubmit(onSubmitForm)}>
        <textarea
          className={styles.textarea}
          {...register(
            'comment',
            { required: true, minLength: { value: 3, message: 'Min 3 symbols required'}}
          )}
          onChange={(e) => {
            setValue('comment', e.target.value, { shouldValidate: true })
            onChange(e);
          }}
        />
        <button
          className={styles.button}
          type={"submit"}
          disabled={!!errors.comment}
        >
          Комментировать
        </button>
        {errors.comment && <span>{errors.comment.message}</span>}
      </form>
{/*
    <DevTool control={control} />
*/}
  </>
  )
}