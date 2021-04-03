import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject(this.clone(initialState));
  }

  getState(): T {
    return this.clone(this._state$.value);
  }

  getState$(): Observable<T> {
    return this._state$.asObservable();
  }
  setState(state: T) {
    this._state$.next(this.clone(this.clone(state)));
  }
  private clone(source: T) {
    return { ...source };
  }
}
