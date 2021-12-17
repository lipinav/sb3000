import React from 'react';
import {IPostsDataPicked, usePostsData } from '../../hooks/usePostsData';
import {useSelector} from 'react-redux';

type TPostValue = string | number | Record<string, unknown> | null | Array<string> | undefined;

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

interface IPostsContext {
  after?: string;
  dist?: number;
  children?: Array<IPosts>;
  loading: boolean;
  error: string;
}

export const postsContext = React.createContext<[IPostsDataPicked, React.Dispatch<React.SetStateAction<boolean>>, boolean]>([
  { after: '', dist: 0, children: [], byIds: {}, loading: false, error: '', loadCount: 0 },
  () => {return},
  true
  ]);

interface IPostsContentProvider {
  children?: React.ReactNode
}
export function PostsContextProvider({ children }: IPostsContentProvider) {
  const [postsAndAuthor, setNewPosts, newPosts] = usePostsData();
  return (
    <postsContext.Provider value={[postsAndAuthor, setNewPosts, newPosts]}>
      {children}
    </postsContext.Provider>
  )
}
