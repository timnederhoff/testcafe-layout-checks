import { Selector } from 'testcafe';

export class TestcafeIO {
  homeButton = Selector('a.page-link').withText('Documentation');
  githubButton = Selector('a.page-link').withText('GitHub');
  faqButton = Selector('a.page-link').withText('FAQ');
  releaseNotesButton = Selector('a.page-link').withText('Release Notes');
}
