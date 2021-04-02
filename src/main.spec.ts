import { sayHello, sum } from './main';

test('sayHello function exists', () => {
  expect(sayHello).toBeDefined();
});

describe('The sum function', () => {
  const sut = sum;
  it('should sum numbers', () => {
    const actual = sut(1, 2);
    const expected = 3;
    expect(actual).toBe(expected);
  });
});
