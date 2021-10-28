import React from 'react';
import styles from './cardslist.css';
import { Card } from './Card';

interface ITitle {
  title: string;
  id: string;
  onClick: (id: string) => void;
}

interface IMyListProps {
  list: ITitle[];
}

export function CardsList({ list }: IMyListProps): JSX.Element {
  console.log('list: ', list)
  return (
    <ul className={styles.cardsList}>
      {list.map((item) => <Card id={item.id} title={item.title} onClick={() => item.onClick(item.id)}/>)}
    </ul>
  );
}
