import * as walk from 'acorn-walk';
import { DynamicImportKey } from './index';

export function inject(injectableWalk) {
  return Object.assign({}, injectableWalk, {
    base: Object.assign({}, injectableWalk.base, {
      [DynamicImportKey]() {},
    }),
  });
}

export default inject(walk);
