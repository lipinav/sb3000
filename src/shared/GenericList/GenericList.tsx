import React from 'react';
// import { CommentsButtonIcon } from '../CardsList/Card/CommentsButton/CommentsButtonIcon';

interface IItem {
  id: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  breakNode?: React.ReactNode;
}

interface IGenericListProps {
  list: IItem[];
}

// export function MyList({ list }: IGenericListProps) {
//   return (
//     <ul>
//       {list.map((item) => (
//         <li onClick={() => item.onClick(item.id)} key={item.id}>{item.title}</li>
//       ))}
//     </ul>
//   );
// }

const NOOP = () => {};

export function GenericList({ list }: IGenericListProps) {
  return (
  <>
    {list.map(({As = 'div', text, onClick = NOOP, className, id, href, children, breakNode, icon}) => (
      <As
        className={className}
        onClick={() => onClick(id)}
        key={id}
        href={href}
      >
        {icon}
        {breakNode}
        {text}
        {children}
      </As>
    ))}
  </>
  );
}
