import * as assert from 'assert';
import { getValue } from '../src/utils.js';

describe('getValue', () => {
  it('can handle undefined input without throwing an error', () => {
    const input = undefined;
    assert.strictEqual(getValue(input), undefined);
  });

  it('can handle an empty string without throwing an error', () => {
    const input = '';
    assert.strictEqual(getValue(input), undefined);
  });

  it('can handle a string with no numerical data', () => {
    const input = 'this string has no numbers';
    assert.strictEqual(getValue(input), undefined);
  });

  it('can extract an integer value from a string', () => {
    const input = '£10';
    assert.strictEqual(getValue(input), 10);
  });

  it('can extract a floating point value from a string', () => {
    const input = '$4.99';
    assert.strictEqual(getValue(input), 4.99);
  });

  it('ignores everything but the numerical value', () => {
    const input = 'something something 12.50 and something else';
    assert.strictEqual(getValue(input), 12.50);
  });

  it('only returns the first numerical value found', () => {
    const input = 'item A costs £1.20 and item B costs £103';
    assert.strictEqual(getValue(input), 1.20);
  });
});
