import {SET_TOKEN, TSetTokenAction} from './actions';
import {Reducer} from 'redux';

export const tokenReducer: Reducer<string, TSetTokenAction> = (state='', action) => {
  switch(action.type) {
    case SET_TOKEN:
      return action.token
    default:
      return state;
  }
}