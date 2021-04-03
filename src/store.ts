import { BehaviorSubject, Observable } from 'rxjs';

export class Store<T> {
  private state$: BehaviorSubject<T>;

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }
  getState() {
    return this.clone(this.state$.value);
  }
  getState$(): Observable<T> {
    return this.state$.asObservable();
  }
  setState(state: T) {
    this.state$.next(this.clone(state));
  }
  private clone(source: T) {
    return { ...source };
  }
}
