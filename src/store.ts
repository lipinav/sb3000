import {Reducer, ActionCreator, AnyAction} from 'redux';

export type RootState = {
  token: string;
  commentText: string;
}

const initialState: RootState = {
  token: '',
  commentText: 'ept ',
}

const SET_TOKEN = 'SET_TOKEN';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const setToken: ActionCreator<AnyAction> = token => ({
  type: SET_TOKEN,
  token
})

export const updateComment: ActionCreator<AnyAction> = text => ({
  type: UPDATE_COMMENT,
  text
})


export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state;
  }
}