import React, {ChangeEvent, FormEvent} from 'react';
import {CommentForm, ICommentValue} from '../CommentForm';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState, updateComment} from '../../store/reducer';

interface ICommentFormContainer {
  author?: string;
}

export function CommentFormContainer({author}: ICommentFormContainer): JSX.Element {
  const value = useSelector<TRootState, {comment:string}>(state => state.commentText);
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    console.log(`Saved comment: ${event.target.value}`);
    dispatch(updateComment({comment: event.target.value}));
  }

  function handleSubmit(value: ICommentValue) {
  }

  return (
    <CommentForm author={author} comment={value} onChange={handleChange} onSubmit={handleSubmit}/>
  )
}
