import React from 'react';
import styles from './header.css';
import { SearchBlock } from './SearchBlock/SearchBlock';
import { ThreadTitle } from './ThreadTitle/ThreadTitle';
import { SortBlock } from './SortBlock/SortBlock';

interface IHeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: IHeaderProps) {
  return (
    <header className={styles.header}>
      <SearchBlock />
      <ThreadTitle />
      <SortBlock />
    </header>
  );
}
