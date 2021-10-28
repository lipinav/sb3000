import React from 'react';

interface IItem {
  title: string;
  id: string;
}

interface IMyListProps {
  list: IItem[];
  onClick: (id: string) => void;
}

export function MyList({ list, onClick }: IMyListProps) {
  return (
    <ul>
      {list.map((item) => (
        <li onClick={() => onClick(item.id)} key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
