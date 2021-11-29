import React, { useContext } from 'react';
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
  const posts = useContext(postsContext);
  return (
    <ul className={styles.cardsList}>
      {/*posts.map((item) => <Card id={item.id} text={item.text}/>)*/}
      {list.map((item) => <Card id={item.id} text={item.text}/>)}
    </ul>
  );
}
