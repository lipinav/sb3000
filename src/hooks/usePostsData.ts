import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { tokenContext } from '../shared/context/tokenContext';
import * as R from 'ramda';
import {pureUrl} from '../utils/js/pureUrl';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState} from '../store/reducer';

type TPostValue = string | number | Record<string, unknown> | null | Array<string> | undefined;

interface IAuthor {
  author?: string;
  icon_img?: string;
  [N: string]: TPostValue;
}

interface IAuthorData {
  kind?: string;
  data?: IAuthor;
}

interface IPosts {
  thumbnail?: string;
  author?: string;
  title?: string;
  name?: string;
  created_utc?: number;
  id?: string;
  selftext?: string;
  selftext_html?: string;
  num_comments?: number;
  preview?: Record<string, unknown>;
  score?: number;
  content_categories?: Array<string>;
  icon_url?: string;
  icon_img?: string;
  [N: string]: TPostValue;
}

interface IPostsDataPicked {
  after?: string;
  dist?: number;
  children: Array<IPosts>;
}

interface IPostsChildren {
    kind?: string;
    data?: IPosts;
}

interface IPostsData {
  after?: string;
  dist?: number;
  children?: Array<IPostsChildren>;
}

interface IPostsResp {
    kind?: string;
    data?: IPostsData;
}

export function usePostsData () {
  // const [postsData, setPostsData] = useState<IPostsDataPicked>({});
  const token = useSelector<TRootState, string>(state => state.token);
  const [postsAndAuthor, setPostsAndAuthor] = useState<IPostsDataPicked>(
    {after: 'undefined', dist: 0, children: []}
  );
  // const token = useContext(tokenContext);

  function addAuthorData(posts: IPostsDataPicked) {
     if (typeof posts?.children !== 'undefined' && !!posts?.children) {
       posts.children.forEach((item) => {
         const axiosUrl = `https://oauth.reddit.com/user/${item.author}/about`;
         axios.get(
           axiosUrl,
           {  // config
             headers: {
               'Authorization': `bearer ${token}`,
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             timeout: 5000
           }
         )
           .then((resp) => {
             const authorData: IAuthorData = resp.data;
             if (typeof authorData.data?.icon_img !== 'undefined') {
               const icon = pureUrl(authorData.data.icon_img);
               setPostsAndAuthor(prevState => {
                   return {
                     after: posts.after,
                       dist: posts.dist,
                     children: prevState.children.concat({...item, icon_img: icon})
                   }
               })
             }
           })
           .catch((err) => {
             console.log('[src/hooks/usePostsData.ts] Axios err: ', err)
           });
       })
     }
   }

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
            const postsResp: IPostsResp = resp.data;
                if (!!postsResp?.data?.children?.length && typeof postsResp?.data?.children !== 'undefined') {
                  const postsOnlyResp: Array<IPosts> = postsResp.data.children.map(item => {
                    if (typeof item.data !== 'undefined') {
                      return R.pick([
                      'thumbnail',
                      'author',
                      'title',
                      'name',
                      'created_utc',
                      'id',
                      'selftext',
                      'selftext_html',
                      'num_comments',
                      'preview',
                      'score',
                      'content_categories',
                      'icon_url',
                    ], item.data)
                    } else {
                      return [];
                    }
                  });
                  addAuthorData({
                    after: postsResp.data.after,
                    dist: postsResp.data.dist,
                    children: postsOnlyResp
                  });
                }
        })
        .catch((err) => {console.log('[src/hooks/usePostsData.ts] Axios err: ', err)});
    }
  }, [token]);
  return [postsAndAuthor]
}
