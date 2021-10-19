import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from '../App';

window.addEventListener('load', () => {
  ReactDom.hydrate(<App />, document.getElementById('react_root'));
  // render renders react app, components on client side, changes all content, removes old
  // hydrate renders only changes
});
