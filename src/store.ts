import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from './models/action';
/**
 * Holds a private observable state
 *
 *
 * @typeParam T - Type of the stored stated
 *
 */
export class Store<T> {
  private _state$: BehaviorSubject<T>;
  private _actions$: BehaviorSubject<Action<T>>;

  /**
   * Creates a new store
   *
   * @param initialState - The initial value for this store
   *
   */
  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(this.clone(initialState));
    this._actions$ = new BehaviorSubject(new Action('INIT', initialState));
  }

  /**
   * Gets a snapshot of the current state
   * @returns a clone of the state
   */
  getState(): T {
    return this.clone(this._state$.value);
  }
  /**
   * Gets an observable of the state changes
   * @returns a typed observable
   */
  getState$(): Observable<T> {
    return this._state$.asObservable().pipe(map(state => this.clone(state)));
  }
  /**
   * Selects a value calculated from the state, and emits all of its changes
   * @param selector A projection or map function
   * @returns A typed observable with the changes
   */
  select$(selector: (state: T) => unknown): Observable<unknown> {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  /**
   * Useful for monitoring the actions dispatched
   * @returns An observable emitting all the processed actions
   */
  getActions$(): Observable<Action<T>> {
    return this._actions$
      .asObservable()
      .pipe(map(action => ({ type: action.type, payload: action.payload })));
  }
  /**
   * The simplest way to assign a new value (obviously not monitores bay any action)
   * @param state the new value of the state to be stored and emitted
   */
  setState(state: T): void {
    this._state$.next(this.clone(state));
  }
  /**
   * The canonical and monitored way of changing the state
   * @param action an action instance
   * @remarks The reducer is optional, in that case the payload will be saved as the new state
   */
  dispatch(action: Action<T>): void {
    if (action.reducer) {
      const newState = action.reducer(this.getState(), action.payload);
      this.setState(newState);
    } else {
      this.setState(action.payload as T);
    }
    this._actions$.next(action);
  }

  private clone(source: T) {
    return { ...source };
  }
}
