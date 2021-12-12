import React from 'react';
import { usePostsData } from '../../hooks/usePostsData';
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
}

// type TPosts = string | number | Record<string, unknown> | null | Array<string> | Array<IPostsChildren> | undefined;

// interface IPosts {
//   thumbnail?: string,
//   author?: string,
//   title?: string,
//   name?: string,
//   created_utc?: number,
//   id?: string,
//   selftext?: string,
//   selftext_html?: string,
//   num_comments?: number,
//   preview?: Record<string, unknown>,
//   score?: number,
//   content_categories?: Array<string>,
//   icon_url?: string;
// //  [N: string]: TPosts
// }
//
// interface IPostsChildren {
//   kind?: string,
//   data?: IPosts
// }
//
// interface IPostsContextData {
//   after?: string,
//   dist?: number,
// //   [N: string]: TPosts,
//   children?: Array<IPostsChildren>
// }

export const postsContext = React.createContext<IPostsContext>({});

interface IPostsContentProvider {
  children?: React.ReactNode
}
export function PostsContextProvider({ children }: IPostsContentProvider) {
  const [posts] = usePostsData();
  return (
    <postsContext.Provider value={posts}>
      {children}
    </postsContext.Provider>
  )
}
