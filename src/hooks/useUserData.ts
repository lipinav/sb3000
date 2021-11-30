import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';

interface IUserData {
  name?: string;
  iconImg?: string;
}

export function useUserData () {
  const [data, setData] = useState<IUserData>({});
  const token = useContext(tokenContext);
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
            console.log('resp.data: ', resp.data);
            const userData = resp.data;
            setData({ name: userData.name, iconImg: userData.icon_img })
        })
        .catch((err) => {console.log('err: ', err)});
    }
  }, [token])

  console.log('token: ', token);
  console.log('data: ', data);
  return [data]
}
