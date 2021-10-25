import React from 'react';
import styles from './cardslist.css';
import { Card } from './Card';

interface ITitle {
  title: string;
}

const contentList: Array<ITitle> = [
  {'title': 'one'},
  {'title': 'two'},
  {'title': 'three'},
]

export function CardsList(): JSX.Element {
  return (
    <ul className={styles.cardsList}>
      {contentList.map((d, idx) => <Card key={idx} title={d.title} />)}
    </ul>
  );
}
