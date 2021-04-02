/* eslint-disable jest/no-done-callback */
import { basket } from './models/basket';
import { Store } from './store';

describe('An observable store', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store(dummyInitialState);
  });
  it('should emit initial state', done => {
    // Act
    sut.getState$().subscribe({
      next: state => {
        const actual = state;
        // Assert
        const expected = { client: '', items: [], status: '' };
        expect(actual).toStrictEqual(expected);
        done();
      },
    });
  });
  it('should emit the change', done => {
    // Act
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
    sut.getState$().subscribe({
      next: state => {
        const actual = state;
        // Assert
        const expected = { client: 'dummy change', items: [], status: '' };
        expect(actual).toStrictEqual(expected);
        done();
      },
    });
  });
  it('should emit changes after subscribe', done => {
    // Act
    sut.getState$().subscribe({
      next: state => {
        const actual = state;
        // Assert
        const expected = { client: 'dummy change', items: [], status: '' };
        expect(actual).toStrictEqual(expected);
        done();
      },
    });
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
  });
  it('should emit several changes', done => {
    const actual: basket[] = [];
    // Act
    const dummyStateBefore = { client: 'dummy change before', items: [], status: '' };
    sut.setState(dummyStateBefore);
    sut.getState$().subscribe({
      next: state => {
        actual.push(state);
        // Assert
        const expected = [{ client: 'dummy change', items: [], status: '' }];
        console.log(actual);
        console.log(expected);
        expect(actual).toStrictEqual(expected);
        done();
      },
    });
    const dummyStateAfter = { client: 'dummy change after', items: [], status: '' };
    sut.setState(dummyStateAfter);
  });
});
