import * as walk from 'acorn-walk/dist/walk';
import { DynamicImportKey } from './plugin';

export function inject(injectableWalk) {
  return Object.assign({}, injectableWalk, {
    base: Object.assign({}, injectableWalk.base, {
      [DynamicImportKey]() {},
    }),
  });
}

export default inject(walk);
