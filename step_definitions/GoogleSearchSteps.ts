import { Given, When, Then } from '@cucumber/cucumber';
import GoogleHomePage from '../page_objects/GoogleHomePage';

Given(/^the user is on the Google search page$/, async function () {
  await new GoogleHomePage(this.web).navigateToHomepage();
  await new GoogleHomePage(this.web).clickAllowCookiesButton();
});

When(/^the user types "([^"]*)" in the search box$/, async function (homepage: string) {
  await new GoogleHomePage(this.web).sendKeysToSearchBox(homepage);
});

When(/^the user clicks on the search button$/, async function () {
  await new GoogleHomePage(this.web).clickSearchButton();
});

Then(/^the search result - "([^"]*)" will be displayed on the screen$/, async function (homepage_title: string) {
  await new GoogleHomePage(this.web).searchResultIsVisible(homepage_title);
});