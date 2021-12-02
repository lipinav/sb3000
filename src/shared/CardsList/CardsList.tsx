import React, { useContext } from 'react';
import styles from './cardslist.css';
import { Card } from './Card';
import { postsContext } from '../context/postsContext';
import { authorContext } from '../context/authorContext';
import * as R from 'ramda';

interface ITitle {
  text: string;
  id: string;
}

interface IMyListProps {
  list: ITitle[];
}

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

interface IPostsContextData {
  after?: string,
  dist?: number,
  [N: string]: TPosts,
  children?: Array<IPostsChildren>
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


export function CardsList({ list }: IMyListProps): JSX.Element {
  const posts = useContext(postsContext);
  console.group('src/shared/CardsList/CardsList.tsx')
  console.log(`posts                  count: ${Object.keys(posts).length} data: ${JSON.stringify(posts)}`);
//  const authorContextList = useContext(authorContext);
//  console.log(`authorContextList:      count: ${authorContextList.length} data: ${JSON.stringify(authorContextList)}`);

//  const requiredList: Array<IPosts> = [];
//  if (posts.children !== [] && typeof posts.children !== 'undefined') {
//    const requiredList: Array<IPosts> = posts.children.map(item => {
////      console.log(`item.data      : ${JSON.stringify(item.data)}`);
//      if (typeof item.data !== 'undefined') {
//        return R.pick([
//          'id', 'title', 'author', 'created_utc', 'icon_img', 'num_comments',
//          'score', 'thumbnail', 'content_categories'], item.data)
//      } else {
//        console.log(`undefined`);
//        return [];
//      }
//    });
//    console.log(`requiredList        count: ${requiredList.length} data: ${JSON.stringify(requiredList)}`);
//  }
//  console.log(`requiredList        count: ${requiredList.length} data: ${JSON.stringify(requiredList)}`);

//  let cardUrl;
//  if (requiredList) {
  const cardUrl = posts.map((
        {
          id, title, author,
          created_utc, icon_img,
          num_comments, score,
          thumbnail, content_categories
        }
      ) => <Card key={id}
        id={id}
        text={title}
        cardImg={thumbnail}
        numComments={num_comments}
        createdAt={created_utc}
        authorName={author}
        avatar={undefined}
        karma={score}
        contentCategories={content_categories}
      />)
//  } else {
//    const cardUrl = list.map((item) => <Card id={item.id} text={item.text}/>)
//  }
  // console.log('src/shared/CardsList/CardsList.tsx cardUrl:', cardUrl);
  console.groupEnd()

  return (
    <ul className={styles.cardsList}>
      {cardUrl}
    </ul>
  );
}