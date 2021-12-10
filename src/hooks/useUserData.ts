import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';
import {pureUrl} from '../utils/js/pureUrl';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

interface IUserData {
  name?: string;
  iconImg?: string;
}

export function useUserData () {
  const [data, setData] = useState<IUserData>({});
  // const token = useContext(tokenContext);
  const token = useSelector<RootState, string>(state => state.token);
  console.log(`token: ${token}`);
  useEffect(() => {
    if ( token !== 'undefined' && token !== '' ) {
      axios.get(
        'https://oauth.reddit.com/api/v1/me',
        {  // config
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
        .then((resp) => {
            const userData = resp.data;
            // const iconUrl = new URL(userData.icon_img);
            // const icon = iconUrl.origin+iconUrl.pathname;
            setData({ name: userData.name, iconImg: pureUrl(userData.icon_img) })
        })
        .catch((err) => {console.log('err: ', err)});
    }
  }, [token])
  return [data]
}
