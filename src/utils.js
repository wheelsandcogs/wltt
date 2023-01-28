import orderBy from 'lodash/orderBy.js';

/**
 * Get the currency value from a string as a float. Only returns the first match.
 *
 * @param {string} str - the string to parse for a numerical value
 * @return number|undefined
 */
export function getValue(str) {
  if (str) {
    const matches = str.match(/[\d.]+/);

    if (matches) {
      return parseFloat(matches[0]);
    }
  }

  return undefined;
}

/**
 * Calculates the annual price for a subscription.
 *
 * @param {object} subscription - the parsed subscription data
 * @return number|undefined
 */
export function calculateAnnualPrice(subscription) {
  return subscription.isMonthly ? subscription.price * 12 : subscription.price;
}

/**
 * Sort the subscription packages by their annual price, most expensive first.
 * The input array is not mutated.
 *
 * @param {array} packages - an array of subscription options
 * @return array
 */
export function sortByAnnualPriceDesc(packages) {
  return orderBy(packages, 'annualPrice', 'desc');
}
