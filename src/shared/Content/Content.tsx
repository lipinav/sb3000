import React from 'react';
import styles from './content.css';

interface IContentProps {
  children?: React.ReactNode;
}

export function Content({ children }: IContentProps): JSX.Element {
  return (
    <main className={styles.component}>
      {children}
    </main>
  );
}
