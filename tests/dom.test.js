import * as assert from 'assert';
import jsdom from 'jsdom';
import * as dom from '../src/dom.js';

const { JSDOM } = jsdom;

describe('dom.parse', () => {
  it('throws an error if no subscription data present', () => {
    const document = JSDOM.fragment('<p>just a paragraph</p>');

    assert.throws(
      () => {
        dom.parse(document);
      },
      /^Error: no subscription data found$/,
    );
  });

  it('will return all packages it finds even if they are missing all data', () => {
    const document = JSDOM.fragment(`
      <div class="package">foo</div>
      <div class="package">bar</div>
    `);

    const packages = dom.parse(document);
    assert.strictEqual(packages.length, 2);
  });

  it('can parse the package title', () => {
    const document = JSDOM.fragment(`
      <div class="package"><div class="header"><h3>Option A</h3></div></div>
      <div class="package"><div class="header"><h3>Option B</h3></div></div>
    `);

    const packages = dom.parse(document);
    assert.ok(packages.find((p) => p.title === 'Option A'));
    assert.ok(packages.find((p) => p.title === 'Option B'));
  });

  it('can parse the package description', () => {
    const document = JSDOM.fragment(`
      <div class="package"><span class="package-description">Desc 1</span></div>
      <div class="package"><span class="package-description">Desc 2</span></div>
    `);

    const packages = dom.parse(document);
    assert.ok(packages.find((p) => p.description === 'Desc 1'));
    assert.ok(packages.find((p) => p.description === 'Desc 2'));
  });

  it('can parse the package price', () => {
    const document = JSDOM.fragment(`
      <div class="package"><span class="price-big">£10.99</span></div>
      <div class="package"><span class="price-big">£14.99</span></div>
    `);

    const packages = dom.parse(document);
    assert.ok(packages.find((p) => p.price === 10.99));
    assert.ok(packages.find((p) => p.price === 14.99));
  });

  it('can parse the package discount', () => {
    const document = JSDOM.fragment(`
      <div class="package"><div class="package-price"><p>Discount of £1.50</p></div></div>
      <div class="package"><div class="package-price"><p>Discount of £8.50</p></div></div>
    `);

    const packages = dom.parse(document);
    assert.ok(packages.find((p) => p.discount === 1.50));
    assert.ok(packages.find((p) => p.discount === 8.50));
  });

  it('it can determine if a package is monthly or annual', () => {
    const document = JSDOM.fragment(`
      <div class="package"><div class="package-data">This is an Annual package</div></div>
      <div class="package"><div class="package-data">This is a monthly package</div></div>
    `);

    const packages = dom.parse(document);
    assert.strictEqual(packages[0].isMonthly, false);
    assert.strictEqual(packages[1].isMonthly, true);
  });

  it('it can calculate the annual price for all packages', () => {
    const document = JSDOM.fragment(`
      <div class="package">
        <span class="price-big">£100</span>
        <div class="package-data">This is an Annual package</div>
      </div>
      <div class="package">
        <span class="price-big">£10.99</span>
        <div class="package-data">This is a monthly package</div>
      </div>
    `);

    const packages = dom.parse(document);
    assert.strictEqual(packages[0].annualPrice, 100);
    assert.strictEqual(packages[1].annualPrice, 12 * 10.99);
  });
});
