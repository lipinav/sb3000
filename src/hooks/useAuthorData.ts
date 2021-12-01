import {useState, useEffect, useContext} from 'react';
import {tokenContext} from '../shared/context/tokenContext';
import axios from 'axios';
import {postsContext} from '../shared/context/postsContext';
import * as R from 'ramda'

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
    content_categories?: Array<string>;
    icon_img?: string;
    [N: string]: TPosts;
}

interface IAuthorData {
    kind?: string;
    data?: IAuthor;
}

export function useAuthorData() {
    const [author, setPostsAuthor] = useState<IAuthor[]>([]);
    const token = useContext(tokenContext);
    const posts = useContext(postsContext);

    useEffect(() => {
        if (
            typeof token !== 'undefined' &&
            token !== ''  &&
            typeof posts !== 'undefined' &&
            posts !== {}
        ) {
            if ( typeof posts.children !== 'undefined' ) {
                posts.children.forEach(item => {
                    const itemAuthor = R.path(['data', 'author'], item)
                    if (typeof itemAuthor !== 'undefined') {

                        const axiosUrl = `https://oauth.reddit.com/user/${itemAuthor}/about`;
                        axios.get(
                            axiosUrl,
                            {  // config
                                headers: {
                                    'Authorization': `bearer ${token}`,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                }
                            }
                        )
                            .then((resp) => {
                                const authorData: IAuthorData = resp.data;
                                const postsAuthorList: Array<IAuthor> = author;
                                if (typeof authorData.data !== 'undefined') {
                                    if (postsAuthorList.length < 25) {
                                        postsAuthorList.push({...item.data, ...authorData.data});
                                        setPostsAuthor(postsAuthorList)
                                     }
                                }
                            })
                            .catch((err) => {
                                console.log('[src/hooks/useAuthorData.ts] Axios err: ', err)
                            });
                    }
                })
            }
        }
    }, [posts, token]);

    console.log('[src/hooks/useAuthorData.ts] useEffect author bottom: ', author);
    return [author]
}