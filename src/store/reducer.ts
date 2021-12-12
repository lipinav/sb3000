import {Reducer, ActionCreator, Action} from 'redux';
import {
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS, TMeRequestErrorAction,
} from './me/actions';
//import {Reducer} from 'react';
import {meReducer, TMeActions, TMeState} from './me/reducer';
import {ThunkAction} from 'redux-thunk';
import {SET_TOKEN, TSetTokenAction} from './token/actions';
import {tokenReducer} from './token/reducer';

export type TRootState = {
  token: string;
  commentText: string;
  me: TMeState;
}

const initialState: TRootState = {
  token: '',
  commentText: 'ept ',
  me: {
    loading: false,
    data: {},
    error: ''
  },
}

const UPDATE_COMMENT = 'UPDATE_COMMENT';
type TUpdateComment = {
  type: typeof UPDATE_COMMENT,
  text: string
}
export const updateComment: ActionCreator<TUpdateComment> = (text: string) => ({
  type: UPDATE_COMMENT,
  text
})

export type TRootAction =
  TSetTokenAction |
  TUpdateComment |
  TMeActions;
export const rootReducer: Reducer<TRootState, TRootAction> = (
  state = initialState,
  action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: tokenReducer(state.token, action)
      }
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text
      }
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action)
      }
    default:
      return state;
  }
}