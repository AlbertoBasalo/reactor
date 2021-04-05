/* eslint-disable jest/no-done-callback */

import { take } from 'rxjs/operators';
import { Action } from '../models/action';
import { Basket } from '../models/basket';
import { Store } from '../store';

describe('An store that dispatches new state with actions', () => {
  const dummyInitialState = { client: '', items: [], status: '' };
  let sut: Store<Basket>;
  beforeEach(() => {
    // Arrange
    sut = new Store<Basket>(dummyInitialState);
  });
  it('should accept payload actions as new state', done => {
    // Act
    const dummyAction = new Action<Basket>(
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
    let actual: Basket;
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
    const dummyAction = new Action<Basket>('ADD_CLIENT', {
      client: 'dummy action change',
      items: [],
      status: '',
    });
    sut.dispatch(dummyAction);
    let actual: Action<Basket>;
    sut
      .getActions$()
      .pipe(take(1))
      .subscribe({
        next: state => (actual = state),
        complete: () => {
          // Assert
          const expected = new Action<Basket>('ADD_CLIENT', {
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
