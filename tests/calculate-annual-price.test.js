import * as assert from 'assert';
import { calculateAnnualPrice } from '../src/utils.js';

describe('calculateAnnualPrice', () => {
  it('handles empty objects', () => {
    const input = {};
    assert.strictEqual(calculateAnnualPrice(input), undefined);
  });

  it('will return an unmodified price for non-monthly subscriptions', () => {
    const input = { price: 101 };
    assert.strictEqual(calculateAnnualPrice(input), 101);
  });

  it('will return the price multiplied by 12 if it is a monthly subscription', () => {
    const input = { price: 11.99, isMonthly: true };
    assert.strictEqual(calculateAnnualPrice(input), 143.88);
  });
});
