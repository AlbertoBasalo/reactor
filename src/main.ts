export { sayHello, sum };

function sayHello(yourName: string): void {
  console.log(`Hello ${yourName}`);
}
function sum(a: number, b: number): number {
  return a + b;
}
const myName = 'Quark';
sayHello(myName);
