import React from 'react';

interface IItem {
  id: string;
  text: string;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
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

const noop = () => {};

export function GenericList({ list }: IGenericListProps) {
  return (
  <>
    {list.map(({As = 'div', text, onClick = noop, className, id, href}) => (
      <As
        className={className}
        onClick={() => onClick(id)}
        key={id}
        href={href}
      >
        {text}
      </As>
    ))}
  </>
  );
}
