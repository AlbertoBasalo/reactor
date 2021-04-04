/* eslint-disable jest/no-done-callback */
import { take } from 'rxjs/operators';
import { Basket } from './models/basket';
import { Store } from './store';

describe('A store with selection feature', () => {
  let sut: Store<Basket>;
  const dummyInitialState = { client: '', items: [], status: '' };
  beforeEach(() => {
    // Arrange
    sut = new Store(dummyInitialState);
  });
  it('should allow get a projection', done => {
    // Act
    let actual = null;
    const selector = (state: Basket) => state.client;
    sut
      .select$(selector)
      .pipe()
      .subscribe({
        next: result => {
          actual = result;
          // Assert
          const expected = '';
          expect(actual).toStrictEqual(expected);
          done();
        },
      });
  });
  it('should hide events without change get a projection', done => {
    // Act
    let actual = 0;
    const selector = (state: Basket) => state.client;
    sut
      .select$(selector)
      .pipe(take(2))
      .subscribe({
        next: result => {
          actual = result;
        },
        complete: () => {
          // Assert
          const expected = 'Changed';
          expect(actual).toBe(expected);
          done();
        },
      });
    sut.setState({ client: '', items: [{ name: 'no' }], status: '' });
    sut.setState({ client: '', items: [{ name: 'no' }], status: 'CLIENT' });
    sut.setState({ client: '', items: [{ name: 'no' }], status: 'CHANGED' });
    sut.setState({ client: 'Changed', items: [{ name: 'detected' }], status: 'OK!' });
  });
});