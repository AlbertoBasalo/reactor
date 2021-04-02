export class Store<T> {
  private state: T;

  constructor(initialState: T) {
    this.state = { ...initialState };
  }
  getState() {
    return { ...this.state };
  }
}
