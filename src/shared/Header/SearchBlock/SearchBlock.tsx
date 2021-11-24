import React from 'react';
import styles from './searchblock.css';
import { UserBlock } from './UserBlock';

export function SearchBlock(): JSX.Element {
  return (
    <div className={styles.searchBlock}>
      <UserBlock />
    </div>
  );
}
