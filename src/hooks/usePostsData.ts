import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';
import * as R from 'ramda';

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
  const [postsOnly, setPostsOnly] = useState<IPosts[]>([]);
  const token = useContext(tokenContext);
  console.group('src/hooks/usePostsData.ts');
  console.log(`started`);

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

                if (postsData.data.children !== [] && typeof posts.children !== 'undefined') {
                  const postsOnlyResp: Array<IPosts> = posts.children.map(item => {
//      console.log(`item.data      : ${JSON.stringify(item.data)}`);
                    if (typeof item.data !== 'undefined') {
                      return R.pick([
                        'id', 'title', 'author', 'created_utc', 'icon_img', 'num_comments',
                        'score', 'thumbnail', 'content_categories'], item.data)
                    } else {
                      console.log(`undefined`);
                      return [];
                    }
                  });
                  console.log(`postsOnlyRest: ${Object.keys(postsOnlyResp).length} ${JSON.stringify(postsOnlyResp)}`)
                  setPostsOnly(postsOnlyResp);
                }


              }
            }
        })
        .catch((err) => {console.log('[src/hooks/usePostsData.ts] Axios err: ', err)});
    }
  }, [token]);

  console.log(`finished`);
  console.groupEnd();
  return [postsOnly]
}
