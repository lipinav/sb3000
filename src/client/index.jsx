import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Header } from '../shared/Header';

window.addEventListener('load', () => {
  ReactDom.hydrate(<Header />, document.getElementById('react_root'));
  // render renders react app, components on client side, changes all content, removes old
  // hydrate renders only changes
});
