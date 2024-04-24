type Arr = readonly unknown[];

/**
 *  * Reducer for function with ***one object*** parameter which

 *
 * @param f The function to reduce
 * @param headArgs First arguments for reducing
 * @returns A new function without the ***headArgs*** provided
 */
export function partialCall<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs);
}

/**
 * Reducer for function with ***one object*** parameter which
 *
 * @param f The function to test
 * @param headArgs First arguments for reducing
 * @returns A new function without the ***headArgs*** provided
 */
export function partialCallO<T extends object, U extends T, R>(
  f: (arg: U) => R,
  headArgs?: T,
) {
  return (remainArgs: Omit<U, keyof T>) =>
    f({ ...remainArgs, ...headArgs } as U);
}
