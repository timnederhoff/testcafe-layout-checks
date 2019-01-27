import { TestcafeIO } from './test.po';
import { device } from '../lib';
import { expectElement } from '../lib';
import { Selector } from 'testcafe';

const page = new TestcafeIO();

fixture('Layout Helper')
  .page('https://devexpress.github.io/testcafe/');

test('different resolutions', async t => {
  await device('1920x1080',
    expectElement(page.githubButton).rightOf(page.homeButton),
    expectElement(page.homeButton).leftOf(page.githubButton)
  );
});
