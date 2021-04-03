import { Reducer } from './reducer';

export class Action<T> {
  constructor(readonly type: string, readonly payload: unknown, readonly reducer?: Reducer<T>) {}
}
