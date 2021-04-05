/* eslint-disable jest/no-done-callback */
import { take } from 'rxjs/operators';
import { Basket } from '../models/basket';
import { Store } from '../store';

describe('An observable inmutable store', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<Basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store<Basket>(dummyInitialState);
  });
  it('should not emit changes not controlled', done => {
    // Act
    const dummyStateBefore = { client: 'dummy change before', items: [], status: '' };
    sut.setState(dummyStateBefore);
    let dummyState: Basket;
    sut
      .getState$()
      .pipe(take(2))
      .subscribe({
        next: state => (dummyState = state),
        complete: () => {
          const actual = sut.getState();
          dummyState.client = 'dummy uncontrolled change!!!';
          // Assert
          const expected = { client: 'dummy change after', items: [], status: '' };
          expect(actual).toStrictEqual(expected);
          done();
        },
      });
    const dummyStateAfter = { client: 'dummy change after', items: [], status: '' };
    sut.setState(dummyStateAfter);
  });
  it('should not change value from outside mutatations of emited values', done => {
    // Act
    const dummyStateBefore = { client: 'dummy change before', items: [], status: '' };
    sut.setState(dummyStateBefore);
    let dummyState: Basket;
    sut
      .getState$()
      .pipe(take(2))
      .subscribe({
        next: state => (dummyState = state),
        complete: () => {
          dummyState.client = 'outside emitted mutations!!!';
          const actual = sut.getState();
          // Assert
          const expected = { client: 'dummy change after', items: [], status: '' };
          expect(actual).toStrictEqual(expected);
          done();
        },
      });
    const dummyStateAfter = { client: 'dummy change after', items: [], status: '' };
    sut.setState(dummyStateAfter);
  });
});
