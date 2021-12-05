import React, {useContext, useEffect, useState} from 'react';
import styles from './cardslist.css';
import { Card } from './Card';
import { postsContext } from '../context/postsContext';

interface ITitle {
  text: string;
  id: string;
}

interface IMyListProps {
  list: ITitle[];
}

export function CardsList({ list }: IMyListProps): JSX.Element {
  const [isPosts, setIsPosts] = useState(false);
  const posts = useContext(postsContext);
  console.log(`posts.children count: ${posts?.children?.length}`);
  useEffect(() => {
    setIsPosts( !!posts.children?.length);
  }, [posts]);
  return (
    <ul className={styles.cardsList}>
      { isPosts
        ? posts?.children?.map((
          {
            id, title, author,
            created_utc, icon_img,
            num_comments, score,
            thumbnail, content_categories, selftext_html
          }
        ) => {return (<Card key={id}
          id={id}
          title={title}
          text={selftext_html}
          cardImg={thumbnail}
          numComments={num_comments}
          createdAt={created_utc}
          authorName={author}
          avatar={icon_img}
          karma={score}
          contentCategories={content_categories}
        />)})
        : list.map((item) => <Card key={item.id} title={item.text} text={'asdf'}/>)
      }
    </ul>
  );
}


