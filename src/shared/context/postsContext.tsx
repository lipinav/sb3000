import React from 'react';
import { usePosts } from '../../hooks/usePostsData';

interface IPostsContext {
<<<<<<< Updated upstream:src/shared/context/postsContext.tsx
  name?: string
=======
  after?: string | null,
  dist?: number,
  modhash?: string | null,
  geo_filter?: string | null,
  children?: Array<object>
>>>>>>> Stashed changes:src/shared/context/bestPostsContext.tsx
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
