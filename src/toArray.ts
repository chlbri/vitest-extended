import { isDefined } from './isDefined';
import type { ToArrayVitest_F, ToArray_F } from './types';

export const toArrayVitest: ToArrayVitest_F = args => {
  return args.map(({ expected, invite, parameters: params }) => {
    const parameters = toArray(params);
    return [invite, parameters, expected] as any;
  });
};

toArrayVitest.error = args => {
  return args.map(({ invite, parameters: params }) => {
    const parameters = toArray.generic(params);
    return [invite, parameters] as any;
  });
};

export const toArray: ToArray_F = obj => {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    const isNotDefined = !isDefined(obj);
    if (isNotDefined) return [];

    return [obj];
  }
};

toArray.generic = obj => toArray(obj);
