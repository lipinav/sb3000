import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';

interface IPostsData {
  after?: string | null,
  dist?: number,
  modhash?: string | null,
  geo_filter?: string | null,
  children?: Array<object>
}

export function useBestPostsData () {
  const [posts, setPostsData] = useState<IPostsData>({});
  const token = useContext(tokenContext);

  useEffect(() => {
    if (token !== '' && typeof(token) !== 'undefined') {
      axios.get(
        'https://oauth.reddit.com/best',
        {  // config
          headers: { Authorization: `bearer ${token}` }
        }
      )
        .then((resp) => {
            const postsData = resp.data;
            console.log('[src/hooks/usePostsData.ts] useEffect resp: ', resp);
            setPostsData({
              after: postsData.data.after,
              dist: postsData.data.dist,
              modhash: postsData.data.modhash,
              children: postsData.data.children
            })
        })
        .catch((err) => {console.log('[src/hooks/usePostsData.ts] Axios err: ', err)});
    }
  }, [token])

  return [posts]
}
