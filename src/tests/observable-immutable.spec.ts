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
  it('should not emit changes not controlled', () => {
    // Act
    let actual;
    const dummyStateBefore = { client: 'dummy change before', items: [], status: '' };
    sut.setState(dummyStateBefore);
    let dummyState: Basket;
    sut
      .getState$()
      .pipe(take(2))
      .subscribe({
        next: state => (dummyState = state),
        complete: () => {
          actual = sut.getState();
          dummyState.client = 'dummy uncontrolled change!!!';
        },
      });
    const dummyStateAfter = { client: 'dummy change after', items: [], status: '' };
    sut.setState(dummyStateAfter);
    // Assert
    const expected = { client: 'dummy change after', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should not change value from outside mutations of emitted values', () => {
    // Act
    let actual;
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
          actual = sut.getState();
        },
      });
    const dummyStateAfter = { client: 'dummy change after', items: [], status: '' };
    sut.setState(dummyStateAfter);
    // Assert
    const expected = { client: 'dummy change after', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
});
