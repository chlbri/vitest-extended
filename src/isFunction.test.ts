import { createTests } from '.';
import { isFunction } from './isFunction';
import { CASES } from './isFunction.data';

const useTests = createTests(isFunction);

useTests(...CASES);
