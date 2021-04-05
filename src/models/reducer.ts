/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A type that enforces the signature of a reducer function
 *
 * @param state the actual value saved at the store
 * @param payload the information to be applied
 * @returns the new state of the store
 *
 */
export type Reducer<T> = (state: T, payload: any) => T;
