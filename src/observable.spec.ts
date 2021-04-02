import { basket } from './models/basket';
import { Store } from './store';

describe('An observable store', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store(dummyInitialState);
  });
  it('should emit initial state', () => {
    // Act
    sut.getState$().subscribe({
      next: state => {
        const actual = state;
        // Assert
        const expected = { client: '', items: [], status: '' };
        expect(actual).toStrictEqual(expected);
      },
    });
  });
  it('should emit the change', () => {
    // Act
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
    sut.getState$().subscribe({
      next: state => {
        const actual = state;
        // Assert
        const expected = { client: 'dummy change', items: [], status: '' };
        expect(actual).toStrictEqual(expected);
      },
    });
  });
});
