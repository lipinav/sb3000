import React from 'react';
import styles from './card.css';
import { MetaData } from './MetaData';
import { Title } from './Title';
import { Preview } from './Preview';
import { Menu } from './Menu';
import { KarmaCounter } from './KarmaCounter';
import { CommentsButton } from './CommentsButton';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';

interface ICardTitle {
  id: string;
  text: string;
}

export function Card(props: ICardTitle): JSX.Element {
  return (
    <li className={styles.card} key={props.id}>
      <div className={styles.textContent}>
        <MetaData />
        <Title text={props.text}/>
      </div>

      <Preview />
      <Menu />

      <div className={styles.controls}>
        <KarmaCounter />
        <CommentsButton />

        <div className={styles.actions}>
          <ShareButton />
          <SaveButton />
        </div>
      </div>

    </li>
  );
}
