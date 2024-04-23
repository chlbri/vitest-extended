export const toUpper = <S extends string>(str: S) => {
  const out = str.toUpperCase();
  return out as Uppercase<S>;
};
