export function isFunction(arg: any) {
  // (Object.prototype.toString.call(value) === "[object Function]" || "function" === typeof value || value instanceof Function)
  const isType = 'function' === typeof arg;
  const isInstance = arg instanceof Function;
  const isArrow =
    Object.prototype.toString.call(arg) === '[object Function]';

  return !!arg && (isType || isInstance || isArrow);
}
