// task 1
//----------------------------------------
// Работа с простыми типами
// Напишите тип функции, конкатенирующей две строки
// concat('Hello ', 'World') // -> Hello World;
type TConcat = (str1: string, str2: string) => string;
function Concat<TConcat>(arg1, arg2) {
  return arg1 + ' ' + arg2;
}
console.log('task 1:')
console.log(Concat('Hello', 'World'), '\n')


// task 2
//----------------------------------------
// Напишите интерфейс для описания следующих данных
// const MyHometask = {
//     howIDoIt: "I Do It Wel",
//     simeArray: ["string one", "string two", 42],
//     withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
// }
interface IWithData {
  howIDoIt: string,
  simeArray: Array<string | number>,
}
interface IMyHometask {
  howIDoIt: string,
  simeArray: Array<string | number>,
  withData: Array<IWithData>,
}
const MyHometask: IMyHometask = {
  howIDoIt: "I Do It Wel",
  simeArray: ["string one", "string two", 42],
  withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
}
console.log('task 2:')
console.log('MyHometask: ', MyHometask, '\n')


// task 3
//----------------------------------------
// Типизация функций, используя Generic
// В уроке про Generics мы написали интерфейс массива MyArray
// interface MyArray<T> {
//   [N: number]: T;
//  добавьте типизацию для метода reduce
//     reduce();
// }
const varMyArray: MyArray<number> = [1, 2, 3];
interface MyArray<T> {
  [N: number]: T,
  reduce<U>(fn: (a: T, v: T) => U, i: number | void): U[]
}
const varMyArrayReduce1 = varMyArray.reduce((a, v) => a + v);
const varMyArrayReduce2 = varMyArray.reduce((a, v) => a + v, 2);
console.log('task 3:')
console.log('varMyArray: ', varMyArray)
console.log('varMyArray1: ', varMyArrayReduce1)
console.log('varMyArray2: ', varMyArrayReduce2, '\n')


// task 4
//----------------------------------------
// Работа с MappedTypes
// interface IHomeTask {
//     data: string;
//     numbericData: number;
//     date: Date;
//     externalData: {
//         basis: number;
//         value: string;
//     }
// }
// Стандартный generic Partial работает так же как Readonly, только для внешних ключей.
// Напишите такой MyPartial, чтобы создание подобного объекта стало возможным
// const homeTask: MyPartial<IHomeTask> = {
//     externalData: {
//         value: 'win'
//     }
// }
interface IHomeTask {
  data: string;
  numbericData: number;
  date: Date;
  externalData: {
    basis: number;
    value: string;
  }
}
type MyPartial<T> = {
  [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N]
}
const homeTask: MyPartial<IHomeTask> = {
  externalData: {
    value: 'win'
  },
}
console.log('task 4:')
console.log('homeTask: ', homeTask, '\n')


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
