import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Action } from './models/action';

// ToDo: Selector with projection and distinct until change

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
    return this._state$.asObservable().pipe(map(state => this.clone(state)));
  }
  select$(selector: (state: T) => any) {
    return this.getState$().pipe(map(selector), distinctUntilChanged());
  }
  getActions$(): Observable<Action<T>> {
    return this._actions$
      .asObservable()
      .pipe(map(action => ({ type: action.type, payload: action.payload })));
  }
  setState(state: T): void {
    this._state$.next(this.clone(state));
  }
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
