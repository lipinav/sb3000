// task 5
//----------------------------------------
// Работа с Generic, Mapped Types, Type inference №1
// Это React Functional Component 
// function HomeComponent(props: { firstProp: string }) {
//     return (
//         <div>
//             { props.firstProp }
//         </div>
//     )
// }
// Напишите такой тип, который извлечет тип props из этого или любого другого React компонента. Подсказка: любой реакт компонент расширяет React.ComponentType<Props>
// props: IProps;
// interface IProps {
//     firstProp: string
// }
// const t = TMyType<typeof HomeComponent>;


import { hot } from 'react-hot-loader/root';
import * as React from 'react';

interface IProps {
  firstProp: string
}

const props: IProps = {
  firstProp: 'super prop',
}


function HomeComponent(props: { firstProp: string }) {
  return (
    <div>
      {firstProp}
    </div>
  )
}
type TMyType<T> = T extends ((...args: infer R) => any) ? R : never;
type t = TMyType<typeof HomeComponent>;

function Welcome(props: IProps) {
  return <h1>Привет, {props.firstProp}</h1>;
}
// export const Task5 = hot(HeaderComponent);
export const Task5 = hot(HomeComponent);
