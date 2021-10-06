import { hot } from 'react-hot-loader/root';
import * as React from 'react';

function HeaderComponent() {  // component
  return (
    <header>
      <h1>Chreddit for our own use</h1>
      <p>
      Hello there
      </p>
    </header>
  );
}

export const Header = hot(HeaderComponent);
