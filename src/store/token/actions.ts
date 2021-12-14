import {ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {TRootAction, TRootState} from '../reducer';
import {useEffect} from 'react';

export const SET_TOKEN = 'SET_TOKEN';
export type TSetTokenAction = {
  type: typeof SET_TOKEN,
  token: string
}
export const setToken: ActionCreator<TSetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token
})

export const saveToken = (): ThunkAction<void, TRootState, unknown, TRootAction> => (dispatch) => {
  useEffect(() => {
    if (window.__token__ && typeof window.__token__ !== 'undefined' && window.__token__ !== 'undefined') {
      dispatch(setToken(window.__token__));
    }
  }, [])
}