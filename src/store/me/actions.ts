import {Action, ActionCreator} from 'redux';
import {IUserData} from '../../hooks/useUserData';
import {ThunkAction} from 'redux-thunk';
import {TRootState} from '../reducer';
import axios from 'axios';
import {pureUrl} from '../../utils/js/pureUrl';

export const ME_REQUEST = 'ME_REQUEST';
export type TMeRequestAction = {
  type: typeof ME_REQUEST
}
export const meRequest: ActionCreator<TMeRequestAction> = () => ({
  type: ME_REQUEST
})

export const ME_REQUEST_SUCCESS = 'ME_REQUEST_SUCCESS';
export type TMeRequestSuccessAction = {
  type: typeof ME_REQUEST_SUCCESS,
  data: IUserData,
}
export const meRequestSuccess: ActionCreator<TMeRequestSuccessAction> = (data: IUserData) => ({
  type: ME_REQUEST_SUCCESS,
  data,
})

export const ME_REQUEST_ERROR = 'ME_REQUEST_ERROR';
export type TMeRequestErrorAction = {
  type: typeof ME_REQUEST_ERROR,
  error: string
}
export const meRequestError: ActionCreator<TMeRequestErrorAction> = (error: string) => ({
  type: ME_REQUEST_ERROR,
  error,
})

export const meRequestAsync: ThunkAction<void, TRootState, unknown, Action<string>> = (dispatch, getState) => {
  dispatch(meRequest());
  if (getState().token === 'undefined' || !getState().token) return;
  axios.get(
    'https://oauth.reddit.com/api/v1/me',
    {  // config
      headers: {
        'Authorization': `bearer ${getState().token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
    .then((resp) => {
      const userData = resp.data;
      dispatch(meRequestSuccess({name: userData.name, iconImg: pureUrl(userData.icon_img)}));
    })
    .catch((err) => {
      console.log('err: ', err);
      dispatch(meRequestError(String(err)));
    });
}