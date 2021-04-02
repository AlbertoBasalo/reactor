import { Store } from './store';

describe('A store with private state', () => {
  it('should have an initial state', () => {
    // Arrange
    const dummyInitialState = { client: '', items: [], status: '' };
    const sut = new Store(dummyInitialState);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should be generic typed', () => {
    const dummyInitialState = { client: '', items: [], status: '' };
    const sut = new Store<basket>(dummyInitialState);
    // Act
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should be inmutable after initialization', () => {
    const dummyInitialState = { client: '', items: [], status: '' };
    const sut = new Store<basket>(dummyInitialState);
    // Act
    dummyInitialState.client = 'fakeCkient';
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should be inmutable after gotten state', () => {
    const dummyInitialState = { client: '', items: [], status: '' };
    const sut = new Store<basket>(dummyInitialState);
    // Act
    const dummyState = sut.getState();
    dummyState.client = 'fakeCkient';
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
});
type basket = { client: string; items: any[]; status: string };
