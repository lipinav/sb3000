import React from 'react';
import styles from './menu.css';
import { Dropdown } from '../../../Dropdown';
import { MenuButton } from './MenuButton';
import { GenericList } from '../../../GenericList';
import { generateId } from '../../../../utils/react/generateRandomIndex';
import { CommentsButtonIcon } from '../CommentsButton/CommentsButtonIcon';

interface IMenuProps {
}

interface IList {
  id: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  // component?: JSX.Element;
}

const LIST: Array<IList> = [
  {
    text: 'Комментарии',
    className: styles.genericListComments,
    As: 'li' as const,
  },
  {
    text: 'Поделиться',
    className: styles.genericListShare,
    As: 'li' as const,
  },
  {
    text: 'Скрыть',
    className: styles.genericListHide,
    As: 'li' as const,
  },
  {
    text: 'Сохранить',
    className: styles.genericListSave,
    As: 'li' as const,
  },
  {
    text: 'Пожаловаться',
    className: styles.genericListComplain,
    As: 'li' as const,
  },
  {
    text: 'Закрыть',
    className: styles.genericListClose,
    As: 'li' as const,
  },
].map(generateId);

export function Menu(props: IMenuProps): JSX.Element {
  return (
    <div className={styles.menu} >
      <Dropdown
        isOpen={false}
        onOpen={() => console.log('opened')}
        onClose={() => console.log('closed')}
        button={<MenuButton />}
        classNameList={styles.dropdownList}
      >
        <ul className={styles.menuList}>
          <GenericList list={LIST}/>
        </ul>
        {/*<GenericList list={[]}/>*/}
        {/*
        <ul>
          <li onClick={console.log}>click me</li>
          <li>do not click me2</li>
        </ul>
        */}
      </Dropdown>
    </div>
  );
}
