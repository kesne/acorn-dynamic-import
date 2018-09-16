/* eslint-disable no-underscore-dangle */
import * as acorn from 'acorn';

export const DynamicImportKey = 'Import';

const tt = acorn.tokTypes;

export default function dynamicImportPlugin(Parser) {
  // NOTE: This allows `yield import()` to parse correctly.
  tt._import.startsExpr = true;

  function parseDynamicImport() {
    const node = this.startNode();
    this.next();
    if (this.type !== tt.parenL) {
      this.unexpected();
    }
    return this.finishNode(node, DynamicImportKey);
  }

  function peekNext() {
    return this.input[this.pos];
  }

  return class extends Parser {
    parseStatement(...args) {
      const node = this.startNode();
      if (this.type === tt._import) {
        const nextToken = peekNext.call(this);
        if (nextToken === tt.parenL.label) {
          const expr = this.parseExpression();
          return this.parseExpressionStatement(node, expr);
        }
      }

      return super.parseStatement(...args);
    }

    parseExprAtom(refDestructuringErrors) {
      if (this.type === tt._import) {
        return parseDynamicImport.call(this);
      }

      return super.parseExprAtom(refDestructuringErrors);
    }
  };
}
