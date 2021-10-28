import React from 'react';

interface IItem {
  title: string;
  id: string;
  onClick: () => void;
}

interface IMyListProps {
  list: IItem[];
}

export function MyList({ list }: IMyListProps) {
  return (
    <ul>
      {list.map((item) => (
        <li onClick={() => item.onClick()} key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
