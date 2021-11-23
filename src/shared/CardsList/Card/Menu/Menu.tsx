import React from 'react';
import styles from './menu.css';
import { Dropdown } from '../../../Dropdown';
import { MenuButton } from './MenuButton';
import { GenericList } from '../../../GenericList';
import { generateId } from '../../../../utils/react/generateRandomIndex';
import { Icon } from '../../../Icon';
import { Break } from '../../../Break';

interface IMenuProps {
  children?: string;
}

interface IList {
  id: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  component?: JSX.Element;
  icon?: React.ReactNode;
  breakNode?: React.ReactNode;
}

const LIST: Array<IList> = [
  {
    text: 'Комментарии',
    className: styles.genericListComments,
    As: 'li' as const,
    icon: <Icon name={'comments'} size={16}/>,
    breakNode: <Break size={4} inline={true}/>
  },
  {
    text: 'Поделиться',
    className: styles.genericListShare,
    As: 'li' as const,
    icon: <Icon name={'share'} size={16}/>,
    breakNode: <Break size={4} inline={true}/>
  },
  {
    text: 'Скрыть',
    className: styles.genericListHide,
    As: 'li' as const,
    icon: <Icon name={'hide'} size={16}/>,
    breakNode: <Break size={4} inline={true}/>
  },
  {
    text: 'Сохранить',
    className: styles.genericListSave,
    As: 'li' as const,
    icon: <Icon name={'save'} size={16}/>,
    breakNode: <Break size={4} inline={true}/>
  },
  {
    text: 'Пожаловаться',
    className: styles.genericListComplain,
    icon: <Icon name={'complain'} size={16}/>,
    As: 'li' as const,
    breakNode: <Break size={4} inline={true}/>
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
