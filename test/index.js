import { expect } from 'chai';
import { join } from 'path';
import { readdirSync, writeFileSync, statSync, readFileSync } from 'fs';

import testPlugin from './testPlugin';

const FIXTURE_PATH = join(__dirname, 'fixtures');

const testFolders = readdirSync(FIXTURE_PATH).filter(file => (
  statSync(join(FIXTURE_PATH, file)).isDirectory()
));

const updateMode = process.env.UPDATE_TESTS === 'pls';

describe('babel-plugin-dynamic-import-node', () => {
  testFolders.forEach((folderName) => {
    it(`works with ${folderName}`, () => {
      const actual = readFileSync(join(FIXTURE_PATH, folderName, 'actual.js'), 'utf8');
      const expectedFile = join(FIXTURE_PATH, folderName, 'expected.json');
      const result = testPlugin(actual);
      let expected;

      // This lets us auto-generate test expected files easily:
      try {
        if (updateMode) throw new Error();
        expected = readFileSync(expectedFile, 'utf8');
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('No expected file found. Generating result file...');
        writeFileSync(expectedFile, JSON.stringify(result, null, '  '));
        throw new Error('Please re-run tests to compare updates.');
      }

      expect(
        // Convert to JSON before doing a compare:
        JSON.parse(JSON.stringify(result)),
      ).to.deep.equal(JSON.parse(expected));
    });
  });
});
