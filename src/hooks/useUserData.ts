import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';
import {pureUrl} from '../utils/js/pureUrl';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState} from '../store/reducer';
import {meRequestAsync} from '../store/me/actions';

export interface IUserData {
  name?: string;
  iconImg?: string;
}

export function useUserData () {
  // const [data, setData] = useState<IUserData>({});
  // const token = useContext(tokenContext);
  const token = useSelector<TRootState, string>(state => state.token);
  const data = useSelector<TRootState, IUserData>(state => state.me.data);
  console.log(`token: ${token}`);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return
    if ( token !== 'undefined' && token !== '' ) {
      dispatch(meRequestAsync);
    }
  }, [token])
  return [data]
}
