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
    id?: string;
    title?: string;
    text?: string;
    cardImg?: string,
    numComments?: number;
    contentCategories?: Array<string>;
    karma?: number;
    createdAt?: number;
    authorName?: string
    avatar?: string;
}

export function Card({ id, title, text, cardImg, numComments, contentCategories, karma, createdAt, authorName, avatar }: ICardTitle): JSX.Element {
  return (
    <li className={styles.card}>
      <div className={styles.textContent}>
        <MetaData author={authorName} avatar={avatar} createdAt={createdAt}/>
        <Title title={title} text={text}/>
      </div>

      <Preview cardImg={cardImg}/>
      <Menu />

      <div className={styles.controls}>
        <KarmaCounter karma={karma}/>
        <CommentsButton numComments={numComments}/>

        <div className={styles.actions}>
          <ShareButton />
          <SaveButton />
        </div>
      </div>

    </li>
  );
}