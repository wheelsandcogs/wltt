import * as assert from 'assert';
import { sortByAnnualPriceDesc } from '../src/utils.js';

describe('sortByAnnualPriceDesc', () => {
  it('handles empty arrays', () => {
    const input = [];
    assert.deepEqual(sortByAnnualPriceDesc(input), []);
  });

  it('does not modify the input array', () => {
    const input = [
      { annualPrice: 3 },
      { annualPrice: 4 },
      { annualPrice: 1 },
      { annualPrice: 2 },
    ];
    const inputCopy = input.slice();
    const output = sortByAnnualPriceDesc(input);
    assert.notDeepEqual(input, output);
    assert.deepEqual(input, inputCopy);
  });

  it('sorts on annual price descending', () => {
    const input = [
      { annualPrice: 3 },
      { annualPrice: 4 },
      { annualPrice: 1 },
      { annualPrice: 2 },
    ];
    const expected = [
      { annualPrice: 4 },
      { annualPrice: 3 },
      { annualPrice: 2 },
      { annualPrice: 1 },
    ];
    assert.deepEqual(sortByAnnualPriceDesc(input), expected);
  });
});
