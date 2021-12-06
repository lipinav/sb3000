import {useContext, useEffect, useState} from "react";
import {tokenContext} from '../shared/context/tokenContext';
import axios from 'axios';

export interface ICommentsContext {
  id: string;            // "id": "hncijrd",
  subreddit_id: string;  //"subreddit_id": "t5_2rm4d",
  author: string;        // "author": "WeGetNoSleep",
  createdUtc: number;    // "created_utc": 1638726491,
  parentId: string;      // "parent_id": "t3_r9jwqa",
  body: string;          // "body": "If you go to check the attic...
  name: string;          // "name": "t1_hncijrd"
  bodyHtml: string;      // "body_html": "&lt;div class=\"md\"&gt;&lt;p&gt;If you go to check the...
  permaLink: string;     // "permalink": "/r/nosleep/comments/r9jwqa/my_wife_heard_a_ski
  subredditNamePrefixed: string;  //"subreddit_name_prefixed": "r/nosleep",
  depth: number;         // "depth": 0,
  ups: number;           // "ups": 368
  replies: ICommentsContext;         // {data: children: [
                                     //                   { data: {
                                     //                             "replies": {}
                                     //                           } },
                                     //                   {}
                                     //                   ]
                                     // }
}

export function useComments (postId: string | undefined) {
  const [comments, setComments] = useState<Array<ICommentsContext>>([]);
  const token = useContext(tokenContext);

  function getComments() {
    axios.get(
    `https://oauth.reddit.com/comments/${postId}`,
      {  // config
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
      .then((res) => {
        const commentsResp = res.data[1];
        setComments(commentsResp?.data?.children);
        }
      )
      .catch((err) => {console.log('[src/hooks/useComments.ts] Axios err: ', err)});
  }
  useEffect(() => {
    if (postId !== '' && typeof postId !== 'undefined') {
      getComments();
    }
  }, [postId]);

  return [comments]
}