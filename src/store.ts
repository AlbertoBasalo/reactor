import { of } from 'rxjs';

export class Store<T> {
  private state: T;

  constructor(initialState: T) {
    this.state = this.clone(initialState);
  }
  getState() {
    return this.clone(this.state);
  }
  getState$() {
    return of(this.getState());
  }
  setState(state: T) {
    this.state = this.clone(state);
  }
  private clone(source: T) {
    return { ...source };
  }
}
