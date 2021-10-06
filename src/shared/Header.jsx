import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import styles from './header.css';

function HeaderComponent() {  // component
  return (
    <header>
      <h1 className={styles.example}>Chreddit for our own use</h1>
      <p>
      Hello there
      </p>
    </header>
  );
}

export const Header = hot(HeaderComponent);
