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
