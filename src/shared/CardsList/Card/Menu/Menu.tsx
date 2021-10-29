import React from 'react';
import styles from './menu.css';
import { Dropdown } from '../../../Dropdown';
import { MenuButton } from './MenuButton';
import { GenericList } from '../../../GenericList';
// import { SaveButton } from '../SaveButton';
// import { ShareButton } from '../ShareButton';
// import { CommentsButton } from '../CommentsButton';

interface IMenuProps {
}

export function Menu(props: IMenuProps): JSX.Element {
  return (
    <div className={styles.menu} >
      <Dropdown
        isOpen={false}
        onOpen={() => console.log('opened')}
        onClose={() => console.log('closed')}
        button={<MenuButton />}
      >
        {/*<GenericList list={[]}/>*/}
        <GenericList list={[]}/>
        <ul>
          <li onClick={console.log}>click me</li>
          <li>do not click me2</li>
        </ul>
      </Dropdown>
    </div>
  );
}
