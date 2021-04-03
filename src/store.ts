import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private _state$: BehaviorSubject<T>;
  private state: T;

  constructor(initialState: T) {
    this.state = this.clone(initialState);
    this._state$ = new BehaviorSubject(this.state);
  }
  getState() {
    return this.clone(this.state);
  }
  getState$(): Observable<T> {
    return this._state$.asObservable();
  }
  setState(state: T) {
    this.state = this.clone(state);
    this._state$.next(this.state);
  }
  private clone(source: T) {
    return { ...source };
  }
}
