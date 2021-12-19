import React, {ChangeEvent, FormEvent} from 'react';
import {CommentForm, ICommentValue} from '../CommentForm';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState, updateComment} from '../../store/reducer';
import {Action, Actions, State, useStoreActions, useStoreState} from 'easy-peasy';
import {IStoreModel} from '../../App';

interface ICommentFormContainer {
  author?: string;
}

export function CommentFormContainer({author}: ICommentFormContainer): JSX.Element {
  // const value = useSelector<TRootState, {comment:string}>(state => state.commentText);
  const value = useStoreState((state: State<IStoreModel>) => state.commentText);
  const updateComment = useStoreActions((actions: Actions<IStoreModel>) => actions.add);
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // dispatch(updateComment({comment: event.target.value}));
    updateComment({comment: event.target.value});
  }

  function handleSubmit(value: ICommentValue) {
    console.log(`Comment: ${value}`);
  }

  return (
    <CommentForm author={author} comment={value} onChange={handleChange} onSubmit={handleSubmit}/>
  )
}
