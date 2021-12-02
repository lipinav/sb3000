import {useState, useLayoutEffect, useEffect, useContext} from 'react';
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

    console.group('src/hooks/useAuthorData.ts');
    useEffect(() => {
        if (
            typeof token !== 'undefined' &&
            token !== ''  &&
            typeof posts !== 'undefined' &&
            posts !== {}
        ) {
            if ( typeof posts.children !== 'undefined' ) {
                let iter = 0;
                posts.children.forEach(item => {
                    const itemAuthor = R.path(['data', 'author'], item)
                    if (typeof itemAuthor !== 'undefined') {
                        console.log(`axios starting, iteration:     ${iter}`);

                        const axiosUrl = `https://oauth.reddit.com/user/${itemAuthor}/about`;
                        axios.get(
                            axiosUrl,
                            {  // config
                                headers: {
                                    'Authorization': `bearer ${token}`,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                timeout: 1000
                            }
                        )
                            .then((resp) => {
                                const authorData: IAuthorData = resp.data;
                                const postsAuthorList: Array<IAuthor> = author;
                                if (typeof authorData.data !== 'undefined') {
                                    if (postsAuthorList.length < 3) {
                                        postsAuthorList.push({...item.data, ...authorData.data});
                                        setPostsAuthor(postsAuthorList)
                                        console.log(`axios work finished: author updated iter: ${iter} data count: ${author.length}`);
                                        iter++;
                                     }
                                }
                            })
                            .catch((err) => {
                                console.log('Axios err: ', err)
                            });
                    }
                })
            }
        }
    }, [posts]);

    setTimeout(() => ({}), 4000);
    console.log(`author                  count: ${author.length}   data: ${JSON.stringify(author)}`);
    console.log(`useAuthorData work finished !!!`);
    console.groupEnd();
    return [author]
}
