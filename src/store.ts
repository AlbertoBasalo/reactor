import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from './models/action';

export class Store<T> {
  private _state$: BehaviorSubject<T>;
  private _actions$: BehaviorSubject<Action<T>>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(this.clone(initialState));
    this._actions$ = new BehaviorSubject(new Action('INIT', initialState));
  }

  getState(): T {
    return this.clone(this._state$.value);
  }
  getState$(): Observable<T> {
    return this._state$.asObservable();
  }
  getActions$(): Observable<Action<T>> {
    return this._actions$.asObservable();
  }
  setState(state: T): void {
    this._state$.next(this.clone(this.clone(state)));
  }
  dispatch(action: Action<T>): void {
    if (action.reducer) {
      const newState = action.reducer(this.getState(), action.payload);
      this.setState(newState);
    } else {
      this.setState(action.payload as T);
    }
    this._actions$.next({ type: action.type, payload: action.payload });
  }

  private clone(source: T) {
    return { ...source };
  }
}
