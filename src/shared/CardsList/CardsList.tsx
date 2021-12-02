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
  const authorContextList = useContext(authorContext);
  console.log(`authorContextList:      count: ${authorContextList.length} data: ${JSON.stringify(authorContextList)}`);

  const requiredList: Array<IAuthor> = authorContextList.map(item => R.pick([
    'id', 'title', 'author', 'created_utc', 'icon_img', 'num_comments',
    'score', 'thumbnail', 'content_categories'], item));

//  let cardUrl;
//  if (authorContextList !== []) {
  const cardUrl = requiredList.map((
        {
          id, title, author,
          created_utc, icon_img,
          num_comments, score,
          thumbnail, content_categories
        }
      ) => <Card
        id={id}
        text={title}
        cardImg={thumbnail}
        numComments={num_comments}
        createdAt={created_utc}
        authorName={author}
        avatar={icon_img}
        karma={score}
        contentCategories={content_categories}
      />)
//  } else {
//    cardUrl = list.map((item) => <Card id={item.id} text={item.text}/>)
//  }
  // console.log('src/shared/CardsList/CardsList.tsx cardUrl:', cardUrl);
  console.log(`requiredList             count: ${requiredList.length} data: ${JSON.stringify(requiredList)}`);
  console.groupEnd()

  return (
    <ul className={styles.cardsList}>
      {cardUrl}
    </ul>
  );
}
