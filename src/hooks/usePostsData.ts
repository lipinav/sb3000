import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';

type TPosts = string | number | Record<string, unknown> | null | Array<string> | Array<IPostsChildren> | undefined;

interface IPosts {
  thumbnail?: string;
  author?: string;
  title?: string;
  name?: string;
  created_utc?: number;
  id?: string;
  selftext?: string;
  num_comments?: number;
  preview?: Record<string, unknown>;
  score?: number;
  content_categories?: Array<string>;
  icon_url?: string;
  [N: string]: TPosts;
}

interface IPostsChildren {
    kind?: string;
    data?: IPosts;
}

interface IPostsData {
  after?: string;
  dist?: number;
  [N: string]: TPosts;
  children?: Array<IPostsChildren>;
}

interface IPostsResp {
    kind?: string;
    data?: IPostsData;
}

export function usePostsData () {
  const [posts, setPostsData] = useState<IPostsData>({});
  const token = useContext(tokenContext);

  useEffect(() => {
    if ( token !== 'undefined' && token !== '' ) {
      axios.get(
        'https://oauth.reddit.com/best',
        {  // config
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
        .then((resp) => {
            const postsData: IPostsResp = resp.data;
            if (typeof postsData !== 'undefined') {
              if (typeof postsData.data !== 'undefined') {
                setPostsData({
                  after: postsData.data.after,
                  dist: postsData.data.dist,
                  children: postsData.data.children
                })
              }
            }
        })
        .catch((err) => {console.log('[src/hooks/usePostsData.ts] Axios err: ', err)});
    }
  }, [token]);

  console.log('[src/hooks/usePostsData.ts] useEffect posts bottom: ', posts);

  return [posts]
}
