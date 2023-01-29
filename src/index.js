import { Command } from 'commander';
import logger from './logger.js';
import * as dom from './dom.js';
import { sortByAnnualPriceDesc } from './utils.js';

/**
 * Requests the HTML from the specified URL and outputs the available
 * subscription packages if present as a JSON string.
 */
async function run(url) {
  try {
    logger.info(`fetching DOM from ${url}`);
    const document = await dom.fetch(url);
    const packages = dom.parse(document);
    logger.info(`found ${packages.length} subscription options`);

    const sortedPackages = sortByAnnualPriceDesc(packages);

    logger.info(JSON.stringify(sortedPackages, null, 2));
    logger.info('scraping complete.');
    process.exit(0);
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
}

async function main() {
  const program = new Command();

  program
    .name('node src/index.js')
    .argument('[url]', 'the URL to parse for subscription packages', 'https://wltest.dns-systems.net')
    .showHelpAfterError()
    .action(run);

  await program.parseAsync(process.argv);
}

main();
