import * as acorn from 'acorn';
import dynamicImportPlugin from './plugin';

export default acorn.Parser.extend(dynamicImportPlugin);
