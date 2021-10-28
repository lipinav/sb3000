import React from 'react';

interface IItem {
  title: string;
  id: string;
  onClick: (id: string) => void;
}

interface IMyListProps {
  list: IItem[];
}

export function MyList({ list }: IMyListProps) {
  return (
    <ul>
      {list.map((item) => (
        <li onClick={() => item.onClick(item.id)} key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
