import React from 'react';
import styles from './cardslist.css';
import { Card } from './Card';

interface ITitle {
  title: string;
  id: string;
}

interface IMyListProps {
  list: ITitle[];
  onClick: (id: string) => void;
}

export function CardsList({ list, onClick }: IMyListProps): JSX.Element {
  console.log('list: ', list)
  return (
    <ul className={styles.cardsList}>
      {list.map((item) => <Card id={item.id} title={item.title} onClick={() => onClick(item.id)}/>)}
    </ul>
  );
}
