import {Reducer} from 'redux';
// import {Reducer} from 'redux';
import {
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS,
  TMeRequestAction,
  TMeRequestErrorAction,
  TMeRequestSuccessAction
} from './actions';
import {IUserData} from '../../hooks/useUserData';

export type TMeState = {
  loading: boolean,
  data: IUserData,
  error: string
}
const initialMeState = {
  loading: false,
  data: {},
  error: ''
}
export type TMeActions = TMeRequestAction | TMeRequestSuccessAction | TMeRequestErrorAction;
export const meReducer: Reducer<TMeState, TMeActions> = (state= initialMeState, action) => {
  switch(action.type) {
    case ME_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ME_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case ME_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}