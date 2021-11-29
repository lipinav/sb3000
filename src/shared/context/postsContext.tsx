import React from 'react';
import { usePosts } from '../../hooks/usePostsData';

interface IPostsContext {
  name?: string
}
export const postsContext = React.createContext<IPostsContext>({});

interface IPostsContentProvider {
  children: React.ReactNode
}
export function PostsContextProvider({ children }: IPostsContentProvider) {
  const [posts] = usePosts();
  return (
    <postsContext.Provider value={posts}>
      {children}
    </postsContext.Provider>
  )
}
