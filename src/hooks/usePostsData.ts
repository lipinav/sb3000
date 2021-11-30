import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';

type TPosts = string | number | Record<string, unknown> | null | Array<string> | undefined;

interface IPosts {
  thumbnail?: string,
  author?: string,
  title?: string,
  name?: string,
  created_utc?: number,
  id?: string,
  selftext?: string,
  num_comments?: number,
  preview?: Record<string, unknown>,
  score?: number,
  content_categories?: Array<string>
  [N: string]: TPosts
}

interface IPostsData {
  after?: string,
  dist?: number,
  children?: {
    kind?: string,
    data?: Array<IPosts>
  }
}

export function usePostsData () {
  const [posts, setPostsData] = useState<IPostsData>({});
  const [postsAuthor, setPostsAuthor] = useState<IPosts[]>([]);
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
            const postsData = resp.data;
            console.log('[src/hooks/usePostsData.ts] useEffect resp: ', postsData);
            setPostsData({
              after: postsData.data.after,
              dist: postsData.data.dist,
              children: postsData.data.children
            })
        })
        .catch((err) => {console.log('[src/hooks/usePostsData.ts] Axios err: ', err)});
    }
  }, [token]);

  // useEffect(() => {

  //   if ( token !== 'undefined' && token !== '' ) {
  //     if ( typeof posts !== 'undefined' ) {
  //       if ( typeof posts.children !== 'undefined' ) {
  //         if ( typeof posts.children.data != 'undefined' ) {
  //           if ( posts.children.data.length > 0) {
  //             posts.children.data.forEach(item => {
  //               axios.get(
  //                 `https://oauth.reddit.com/user/${item.author}/about`,
  //                 {  // config
  //                   headers: {
  //                     'Authorization': `bearer ${token}`,
  //                     'Content-Type': 'application/x-www-form-urlencoded'
  //                   }

  //                 }
  //               )
  //                 .then((resp) => {
  //                     const authorData = resp.data;
  //                     console.log('[src/hooks/usePostsData.ts] useEffect author resp: ', authorData);
  //                     setPostsAuthor([
  //                       { ...item, ...authorData }
  //                     ])
  //                 })
  //                 .catch((err) => {console.log('[src/hooks/usePostsData.ts] Axios err: ', err)});
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  // }, [posts, token]);

  console.log('[src/hooks/usePostsData.ts] useEffect posts: ', posts);
  console.log('[src/hooks/usePostsData.ts] useEffect postsAuthor: ', postsAuthor);

  return [posts]
}
