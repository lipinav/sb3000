import React from 'react';
import styles from './cardslist.css';
import { Card } from './Card';

interface ITitle {
  text: string;
  id: string;
}

interface IMyListProps {
  list: ITitle[];
}

export function CardsList({ list }: IMyListProps): JSX.Element {
  return (
    <ul className={styles.cardsList}>
      {list.map((item) => <Card id={item.id} text={item.text}/>)}
    </ul>
  );
}
