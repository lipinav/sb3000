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
interface IPostsNoId {
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
interface IPostsByIds {
  [N: string]: IPostsNoId;
}
export interface IPostsDataPicked {
  after?: string;
  dist?: number;
  children: Array<IPosts>;
  byIds: IPostsByIds;
  loading: boolean;
  error: string;
  loadCount: number;
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
    {after: '', dist: 0, children: [], byIds: {}, loading: false, error: '', loadCount: 0}
  );
  const [newPosts, setNewPosts] = useState(true);
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
             const newObjById: IPostsByIds = {};
             if (typeof item.id !== 'undefined') {
               const key = item.id;
               newObjById[key] = {...item, icon_img: icon};
             }
             setPostsAndAuthor(prevState => {
                 return {
                   after: posts.after,
                   dist: posts.dist,
                   children: prevState.children.concat({...item, icon_img: icon}),
                   byIds: {...prevState.byIds, ...newObjById},
                   loading: false,
                   error: '',
                   loadCount: posts.loadCount
                 }
             })
             setNewPosts(false);
           }
         })
         .catch((err) => {
           console.log('[src/hooks/usePostsData.ts] Axios err: ', err)
         });
     })
  }
   }
  async function loadPosts() {
    if (token === 'undefined' || token === '' || !newPosts) return;
    setPostsAndAuthor((prevPosts) => {
      return {
        ...prevPosts,
        loading: true,
        error: ''
      }
    })
    try {
      const resp = await axios.get(
        'https://oauth.reddit.com/best',
        {  // config
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          params: {
            limit: 10,
            after: postsAndAuthor.after
          }
        }
      );
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
        // save for future
        const byIds: IPostsByIds = R.reduce((acc, post: IPosts) => {
          if (post.id !== '' && typeof post.id !== 'undefined') {
            const postsNoId: IPostsNoId = R.omit(['id'], post);
            const id = post.id;
            return {...acc, id: postsNoId}
          } else {
            return acc
          }
        }, {}, postsOnlyResp);
        addAuthorData({
          after: postsResp.data.after,
          dist: postsResp.data.dist,
          children: postsOnlyResp,
          byIds: {},
          loading: true,
          error: '',
          loadCount: postsAndAuthor.loadCount + 1
        });
      }
    } catch (err) {
      console.log('[src/hooks/usePostsData.ts] Axios err: ', err)
      setPostsAndAuthor(prevPosts => {
        return {
          ...prevPosts,
          loading: false,
          error: String(err)
        }
      })
    }

    setPostsAndAuthor((prevPosts) => {
      return {
        ...prevPosts,
        loading: false
      }
    });
  }

  useEffect(() => {
    loadPosts();
  }, [token, newPosts]);

  return [postsAndAuthor, setNewPosts, newPosts] as const
}