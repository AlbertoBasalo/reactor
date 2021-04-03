import { Store } from './store';

// Arrange
const dummyInitialState = { client: '', items: [], status: '' };
let sut: Store<any>;
describe('A store with private state', () => {
  beforeEach(() => {
    // Arrange
    sut = new Store(dummyInitialState);
  });
  it('should have an initial state', () => {
    // Act
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should be generic typed', () => {
    // Act
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should be immutable after initialization', () => {
    // Act
    dummyInitialState.client = 'initial changed';
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should be immutable after gotten state', () => {
    // Act
    const dummyState = sut.getState();
    dummyState.client = 'state changed';
    const actual = sut.getState();
    // Assert
    const expected = { client: '', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should allow changes on its state', () => {
    // Act
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
    const actual = sut.getState();
    // Assert
    const expected = { client: 'dummy change', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  it('should make changes immutables', () => {
    // Act
    const dummyState = { client: 'dummy change', items: [], status: '' };
    sut.setState(dummyState);
    dummyState.client = 'dummy muttated';
    const actual = sut.getState();
    // Assert
    const expected = { client: 'dummy change', items: [], status: '' };
    expect(actual).toStrictEqual(expected);
  });
  afterEach(() => {
    dummyInitialState.client = '';
  });
});
