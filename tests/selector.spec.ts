import { take } from 'rxjs/operators';
import { Basket } from '../samples/basket';
import { Store } from '../src/store';

describe('A store with selection feature', () => {
  let sut: Store<Basket>;
  const dummyInitialState = { client: '', items: [], status: '' };
  beforeEach(() => {
    // Arrange
    sut = new Store<Basket>(dummyInitialState);
  });
  it('should allow get a projection', () => {
    // Act
    let actual = null;
    const selector = (state: Basket) => state.client;
    sut
      .select$(selector)
      .pipe()
      .subscribe({
        next: result => (actual = result),
      });
    // Assert
    const expected = '';
    expect(actual).toStrictEqual(expected);
  });
  it('should hide events without change get a projection', () => {
    // Act
    let actual: unknown;
    const selector = (state: Basket) => state.client;
    sut
      .select$(selector)
      .pipe(take(2))
      .subscribe({
        next: result => (actual = result),
      });
    sut.setState({ client: '', items: [{ name: 'no', unitPrice: 1, units: 0 }], status: '' });
    sut.setState({ client: '', items: [{ name: 'no', unitPrice: 1, units: 0 }], status: 'CLIENT' });
    sut.setState({
      client: '',
      items: [{ name: 'no', unitPrice: 1, units: 0 }],
      status: 'CHANGED',
    });
    sut.setState({
      client: 'Changed',
      items: [{ name: 'detected', unitPrice: 1, units: 0 }],
      status: 'OK!',
    });
    // Assert
    const expected = 'Changed';
    expect(actual).toBe(expected);
  });
});
