import { Basket } from '@ab/models/basket';
import { Store } from '@ab/store';
import { skip, take, tap } from 'rxjs/operators';

describe('An observable store', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<Basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store<Basket>(dummyInitialState);
  });
  it('should emit initial state', () => {
    // Act
    let actual;
    sut.getState$().subscribe({
      next: state => (actual = state),
    });
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should emit the change', () => {
    // Act
    let actual;
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
    sut.getState$().subscribe({
      next: state => (actual = state),
    });
    // Assert
    const expected = { client: 'dummy change', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should emit changes after subscribe', () => {
    // Act
    let actual;
    sut
      .getState$()
      .pipe(skip(1))
      .subscribe({
        next: state => (actual = state),
      });
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
    // Assert
    const expected = { client: 'dummy change', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should emit several changes', () => {
    const actual: Basket[] = [];
    // Act
    const dummyStateBefore = { client: 'dummy change before', items: [], status: '' };
    sut.setState(dummyStateBefore);
    sut
      .getState$()
      .pipe(tap({ next: state => actual.push(state) }), take(2))
      .subscribe();
    const dummyStateAfter = { client: 'dummy change after', items: [], status: '' };
    sut.setState(dummyStateAfter);
    // Assert
    const expected = [
      { client: 'dummy change before', items: [], status: '' },
      { client: 'dummy change after', items: [], status: '' },
    ];
    expect(actual).toStrictEqual(expected);
  });
});
