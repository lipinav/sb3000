import React from 'react';
import { usePostsData } from '../../hooks/usePostsData';

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

interface IPostsContext {
  after?: string,
  dist?: number,
  children?: {
    kind?: string,
    data?: Array<IPosts>
  }
}

export const postsContext = React.createContext<IPostsContext>({});

interface IPostsContentProvider {
  children: React.ReactNode
}
export function PostsContextProvider({ children }: IPostsContentProvider) {
  const [posts] = usePostsData();
  return (
    <postsContext.Provider value={posts}>
      {children}
    </postsContext.Provider>
  )
}
