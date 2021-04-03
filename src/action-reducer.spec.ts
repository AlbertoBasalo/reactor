/* eslint-disable jest/no-done-callback */

import { take } from 'rxjs/operators';
import { Action } from './models/action';
import { basket } from './models/basket';
import { Store } from './store';

describe('An store that dispatches new state with actions', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store<basket>(dummyInitialState);
  });
  it('should accept payload actions as new state', done => {
    // Act
    const dummyAction = new Action<basket>(
      'ADD_CLIENT',
      {
        client: 'dummy action change',
      },
      (state, payload) => {
        state.client = payload.client;
        return state;
      }
    );
    sut.dispatch(dummyAction);
    let actual: basket;
    sut
      .getState$()
      .pipe(take(1))
      .subscribe({
        next: state => (actual = state),
        complete: () => {
          // Assert
          const expected = { client: 'dummy action change', items: [], status: '' };
          expect(actual).toStrictEqual(expected);
          done();
        },
      });
  });
  it('should emit the processed actions for instrumentation or effects', done => {
    // Act
    const dummyAction = new Action<basket>('ADD_CLIENT', {
      client: 'dummy action change',
      items: [],
      status: '',
    });
    sut.dispatch(dummyAction);
    let actual: Action<basket>;
    sut
      .getActions$()
      .pipe(take(1))
      .subscribe({
        next: state => (actual = state),
        complete: () => {
          // Assert
          const expected = new Action<basket>('ADD_CLIENT', {
            client: 'dummy action change',
            items: [],
            status: '',
          });
          expect(actual.type).toStrictEqual(expected.type);
          expect(actual.payload).toStrictEqual(expected.payload);
          done();
        },
      });
  });
});
