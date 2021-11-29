import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';

interface IPosts {
  name?: string;
}

export function usePosts () {
  const [posts, setPosts] = useState<IPosts>({});
  const token = useContext(tokenContext);
  useEffect(() => {
    axios.get(
      'https://oauth.reddit.com/api/v1/me',
      {  // config
        headers: { Authorization: `bearer ${token}` }
      }
    )
      .then((resp) => {
          console.log('resp.data: ', resp.data);
          const postsData = resp.data;
          setPosts(postsData)
      })
      .catch((err) => {console.log('Axios err: ', err)});
  }, [token])

  return [posts]
}
