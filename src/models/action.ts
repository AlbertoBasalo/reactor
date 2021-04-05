/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Reducer } from './reducer';
/**
 * A blueprint that enforces a type and a payload to be stored
 *
 * Optional carries a reducer function to be applied current state using the payload as an argument
 *
 */
export class Action<T> {
  /**
   * Creates a new redux like action
   * @param type a string to identify the type of the action
   * @param payload the information to be stored
   * @param reducer the optional function to be applied
   */
  constructor(readonly type: string, readonly payload: any, readonly reducer?: Reducer<T>) {}
}
