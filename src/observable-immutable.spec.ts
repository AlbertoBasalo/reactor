/* eslint-disable jest/no-done-callback */
import { take } from 'rxjs/operators';
import { basket } from './models/basket';
import { Store } from './store';

describe('An observable inmutable store', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store<basket>(dummyInitialState);
  });
  it('should not emit changes not controlled', done => {
    // Act
    const dummyStateBefore = { client: 'dummy change before', items: [], status: '' };
    sut.setState(dummyStateBefore);
    let dummyState: basket;
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
});
