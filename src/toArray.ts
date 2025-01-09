import type { ToArray2_F, ToArray_F } from './types';

export const toArray2: ToArray2_F = args => {
  return args.map(({ expected, invite, parameters: params }) => {
    const parameters = toArray(params);
    return [invite, parameters, expected] as any;
  });
};

export const toArray: ToArray_F = obj => {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    if (!obj) return [];
    return [obj];
  }
};
