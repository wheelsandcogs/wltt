import jsdom from 'jsdom';
import { getValue, calculateAnnualPrice } from './utils.js';

/**
 * Fetches the html from the provided url and converts it into a virtual Document Object Model.
 *
 * @param {string} url - the URL to fetch and parse
 * @return object
 */
export async function fetch(url) {
  const { JSDOM } = jsdom;
  // create virtual console to mute CSS parsing errors, see https://github.com/jsdom/jsdom/issues/2230
  const virtualConsole = new jsdom.VirtualConsole();
  const dom = await JSDOM.fromURL(url, { virtualConsole });
  const { document } = dom.window;

  return document;
}

/**
 * Parse the DOM to find the required subscription data.
 * Returns an array of objects containing subscription info.
 *
 * @param {object} document - a JSDOM document instance
 * @return array
 */
export function parse(document) {
  const packages = [];
  const elements = document.querySelectorAll('.package');

  if (elements.length === 0) {
    throw new Error('no subscription data found');
  }

  elements.forEach((packageDiv) => {
    const subscription = {
      title: packageDiv.querySelector('.header h3')?.textContent,
      description: packageDiv.querySelector('.package-description')?.innerHTML, // keep linebreaks
      price: getValue(packageDiv.querySelector('.price-big')?.textContent),
      isMonthly: !packageDiv.querySelector('.package-data')?.textContent.includes('Annual'),
      discount: getValue(packageDiv.querySelector('.package-price p')?.textContent),
    };

    subscription.annualPrice = calculateAnnualPrice(subscription);
    packages.push(subscription);
  });

  return packages;
}
