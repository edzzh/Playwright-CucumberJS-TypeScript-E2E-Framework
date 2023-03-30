import Assert from "../helpers/Assert";
import UIActions from '../helpers/UIActions';

export default class GoogleHomePage {
  private readonly allowCookiesButton = 'button[id="L2AGLb"]';
  private readonly searchBox = 'input[name="q"]';
  private readonly searchButton = 'div[class="FPdoLc lJ9FBc"] > center > input[class="gNO89b"]';
  private readonly searchResults = 'h3[class="LC20lb MBeuO DKV0Md"]';

  constructor(private web: UIActions) {}
  
  public async navigateToHomepage(): Promise<void> {
    await this.web.goto('https://www.google.com/');
  }

  public async clickAllowCookiesButton(): Promise<void> {
    await this.web.element(this.allowCookiesButton, 'Allow Cookies Button').click();
  }

  public async sendKeysToSearchBox(searchText: string): Promise<void> {
    await this.web.inputField(this.searchBox, 'Search Box').type(searchText);
  }

  public async clickSearchButton(): Promise<void> {
    await this.web.element(this.searchButton, 'Search Button').click();
  }

  public async searchResultIsVisible(expected_hompage_title: string): Promise<void> {
    const actual = await this.web.element(this.searchResults).getTextContent();

    await Assert.assertContains(actual, expected_hompage_title);
  }
}