import acorn from '../src';

export default function testPlugin(code) {
  let result;
  try {
    result = acorn.parse(code, {
      ecmaVersion: 7,
      locations: true,
      ranges: true,
      plugins: {
        dynamicImport: true,
      },
      sourceType: 'module',
    });
  } catch (e) {
    result = {
      error: e.message,
    };
  }

  return result;
}
