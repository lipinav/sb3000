import React from 'react';
import {useAuthorData} from '../../hooks/useAuthorData';

type TAuthor = string | number | Record<string, unknown> | null | Array<string> | Array<IPostsChildren> | undefined;
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
    [N: string]: TPosts;
}

interface IPostsChildren {
    kind?: string,
    data?: IPosts
}

interface IAuthor {
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
    content_categories?: Array<string>
    icon_img?: string;
    icon_url?: string;
    [N: string]: TAuthor;
}

export const authorContext = React.createContext<IAuthor[]>([]);

interface IAuthorContextProvider {
    children?: React.ReactNode
}
export function AuthorContextProvider({children}: IAuthorContextProvider): JSX.Element {
    const [author] = useAuthorData();
//    console.group(`src/shared/context/authorContext.tsx`);
//    console.log(`author                  count: ${author.length}   data: ${JSON.stringify(author)}`);
//    console.groupEnd();
    return (
        <authorContext.Provider value={author}>
            {children}
        </authorContext.Provider>
    )
}