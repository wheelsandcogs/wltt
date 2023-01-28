import jsdom from 'jsdom';

/**
 * Fetches the html from the provided url and converts it into a virtual Document Object Model.
 *
 * @param {string} url - the URL to fetch and parse
 * @return object
 */
export default async function getDOM(url) {
  const { JSDOM } = jsdom;
  // create virtual console to mute CSS parsing errors, see https://github.com/jsdom/jsdom/issues/2230
  const virtualConsole = new jsdom.VirtualConsole();
  return JSDOM.fromURL(url, { virtualConsole });
}
