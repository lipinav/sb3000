import React, { useContext } from 'react';
import styles from './cardslist.css';
import { Card } from './Card';
import { postsContext } from '../context/postsContext';
import {authorContext} from '../context/authorContext';

interface ITitle {
  text: string;
  id: string;
}

interface IMyListProps {
  list: ITitle[];
}


export function CardsList({ list }: IMyListProps): JSX.Element {
  const posts = useContext(postsContext);
  console.log('src/shared/CardsList/CardsList.tsx posts:', posts);
  const authorContextList = useContext(authorContext);
  console.log('src/shared/CardsList/CardsList.tsx authorContextList:', authorContextList);
  return (
    <ul className={styles.cardsList}>
      {/*posts.map((item) => <Card id={item.id} text={item.text}/>)*/}
      { authorContextList.map((
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
      }
    </ul>
  );
}
