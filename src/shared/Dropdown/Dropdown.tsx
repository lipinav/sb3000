/*eslint-env es6*/
import React from 'react';
import styles from './dropdown.css';
import { useIsMounted } from '../../hooks/useIsMounted';
import ReactDOM from 'react-dom';

interface IDropdownProps {
  children: React.ReactNode;
  classNameList?: string;
}

export function Dropdown({children, classNameList}: IDropdownProps): JSX.Element {
  const node = typeof window !== 'undefined' ? document.querySelector('#dropdown_root') : undefined;
  if (!node) { return <></>; }

  return ReactDOM.createPortal((
    <div className={styles.container}>
        <div className={styles.listContainer}>
          <div className={`styles.list ${classNameList}`}>
            {children}
          </div>
        </div>
    </div>
  ), node);
}