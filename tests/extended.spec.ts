import { Basket$ } from '../samples/extended';

describe('An extended store', () => {
  let sut: Basket$;
  const actual: unknown[] = [];
  beforeEach(() => {
    // Arrange
    sut = new Basket$();
    sut.getState$().subscribe({
      next: basket => actual.push(basket),
    });
  });
  it('should allow basic operations', () => {
    // Act
    sut.setClient('John Doe');
    sut.addItem({
      name: 'An ACME thing',
      units: 19,
      unitPrice: 71,
    });
    // Assert
    const expected = [
      { client: '', items: [], status: '' },
      {
        client: 'John Doe',
        items: [],
        status: 'EMPTY',
      },
      {
        client: 'John Doe',
        items: [{ name: 'An ACME thing', unitPrice: 71, units: 19 }],
        status: 'FILLED',
      },
    ];
    expect(actual).toStrictEqual(expected);
  });
});
