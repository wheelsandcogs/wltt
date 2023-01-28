import { Command } from 'commander';
import logger from './logger.js';
import getDOM from './get-dom.js';
import { getValue, calculateAnnualPrice, sortByAnnualPriceDesc } from './utils.js';

/**
 * Requests the HTML from the specified URL and outputs the available
 * subscription packages if present as a JSON string.
 */
async function run(url) {
  logger.info(`fetching DOM from ${url}`);
  const dom = await getDOM(url);
  const { document } = dom.window;
  const packages = [];

  const elements = document.querySelectorAll('.package');

  if (elements.length === 0) {
    logger.error(`no subscription data found at ${url}`);
    process.exit(1);
  }

  logger.info(`found ${elements.length} subscription options`);

  elements.forEach((packageDiv) => {
    const subscription = {
      title: packageDiv.querySelector('.header h3').textContent,
      description: packageDiv.querySelector('.package-description').innerHTML, // keep linebreaks
      price: getValue(packageDiv.querySelector('.price-big').textContent),
      isMonthly: !packageDiv.querySelector('.package-data').textContent.includes('Annual'),
      discount: getValue(packageDiv.querySelector('.package-price p')?.textContent),
    };

    subscription.annualPrice = calculateAnnualPrice(subscription);
    packages.push(subscription);
  });

  const sortedPackages = sortByAnnualPriceDesc(packages);
  logger.info(JSON.stringify(sortedPackages, null, 2));
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
