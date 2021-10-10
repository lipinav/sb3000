function Concat(arg1, arg2) {
    return arg1 + ' ' + arg2;
}
console.log('task 1:');
console.log(Concat('Hello', 'World'), '\n');
var MyHometask = {
    howIDoIt: "I Do It Wel",
    simeArray: ["string one", "string two", 42],
    withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }]
};
console.log('task 2:');
console.log('MyHometask: ', MyHometask, '\n');
// task 3
//----------------------------------------
// Типизация функций, используя Generic
// В уроке про Generics мы написали интерфейс массива MyArray
// interface MyArray<T> {
//   [N: number]: T;
//  добавьте типизацию для метода reduce
//     reduce();
// }
var varMyArray = [1, 2, 3];
var varMyArrayReduce1 = varMyArray.reduce(function (a, v) { return a + v; });
var varMyArrayReduce2 = varMyArray.reduce(function (a, v) { return a + v; }, 2);
console.log('task 3:');
console.log('varMyArray: ', varMyArray);
console.log('varMyArray1: ', varMyArrayReduce1);
console.log('varMyArray2: ', varMyArrayReduce2, '\n');
var homeTask = {
    externalData: {
        value: 'win'
    }
};
console.log('task 4:');
console.log('homeTask: ', homeTask, '\n');
