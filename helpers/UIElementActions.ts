import { Page, Locator } from '@playwright/test';
import { CommonConstants } from '../config/CommonConstants';

type LocatorType = "alert"|"alertdialog"|"application"|"article"|"banner"|"blockquote"|"button"|"caption"|"cell"|"checkbox"|"code"|"columnheader"|"combobox"|"complementary"|"contentinfo"|"definition"|"deletion"|"dialog"|"directory"|"document"|"emphasis"|"feed"|"figure"|"form"|"generic"|"grid"|"gridcell"|"group"|"heading"|"img"|"insertion"|"link"|"list"|"listbox"|"listitem"|"log"|"main"|"marquee"|"math"|"meter"|"menu"|"menubar"|"menuitem"|"menuitemcheckbox"|"menuitemradio"|"navigation"|"none"|"note"|"option"|"paragraph"|"presentation"|"progressbar"|"radio"|"radiogroup"|"region"|"row"|"rowgroup"|"rowheader"|"scrollbar"|"search"|"searchbox"|"separator"|"slider"|"spinbutton"|"status"|"strong"|"subscript"|"superscript"|"switch"|"tab"|"table"|"tablist"|"tabpanel"|"term"|"textbox"|"time"|"timer"|"toolbar"|"tooltip"|"tree"|"treegrid"|"treeitem";

export default class UIElementActions {
  private locator: Locator;
  private description: string;
  private selector: string;

  constructor(private page: Page) {}

  /**
   * Returns the first locator
   * @returns Locator
   */
  public getLocator(): Locator {
    return this.locator.first();
  }

  /**
   * Returns the all the locators
   * @returns Locator
   */
  public getLocators(): Locator {
    return this.locator;
  }
  
  /**
   * Sets the locator using the selector * 
   * @param selector 
   * @param description
   * @returns UIElementActions
   */
  public setElement(selector: string, description: string): UIElementActions {
    this.selector = selector;
    this.locator = this.page.locator(this.selector);
    this.description = description;
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns UIElementActions
   */
  public setLocator(locator: Locator, description: string): UIElementActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * Click on element
   * @returns Promise<UIElementActions>
   */
  public async click(): Promise<UIElementActions> {
    await this.getLocator().click();
    return this;
  }

  /**
   * Double click on element
   * @returns Promise<UIElementActions>
   */
  public async doubleClick(): Promise<UIElementActions> {
    await this.getLocator().dblclick();
    return this;
  }

  /**
   * scroll element into view, unless it is completely visible
   * @returns Promise<UIElementActions>
   */
  public async scrollIntoView(): Promise<UIElementActions> {
    await this.getLocator().scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Wait for element to be invisible
   * @returns Promise<UIElementActions>
   */
  public async waitTillInvisible(): Promise<UIElementActions> {
    await this.getLocator().waitFor({ state: "hidden", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * wait for element not to be present in DOM
   * @returns Promise<UIElementActions>
   */
  public async waitTillDetached(): Promise<UIElementActions> {
    await this.getLocator().waitFor({ state: "detached", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * wait for element to be visible
   * @returns Promise<UIElementActions>
   */
  public async waitTillVisible(): Promise<UIElementActions> {
    await this.getLocator().waitFor({ state: "visible", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * wait for element to be attached to DOM
   * @returns Promise<UIElementActions>
   */
  public async waitForPresent(): Promise<UIElementActions> {
    await this.getLocator().waitFor({ state: "attached", timeout: CommonConstants.WAIT });
    return this;
  }

  /**
   * This method hovers over the element
   */
  public async hover(): Promise<UIElementActions> {
    await this.getLocator().hover();
    return this;
  }

  /**
   * Returns input.value for <input> or <textarea> or <select> element.
   * @returns Promise<string>
   */
  public async getInputValue(): Promise<string> {
    await this.waitTillVisible();
    return await this.getLocator().inputValue();
  }

  /**
   * Gets the text content
   * @returns Promise<string>
   */
  public async getTextContent(): Promise<string> {
    await this.waitTillVisible();
    return (await this.getLocator().textContent()).trim();
  }

  /**
   * Get Attribute value
   * @param attributeName
   * @returns Promise<string>
   */
  public async getAttribute(attributeName: string): Promise<string> {
    await this.waitTillVisible();
    return (await this.getLocator().getAttribute(attributeName)).trim();
  }

  /**
   * Get innerHTML
   * @returns Promise<string>
   */
  public async getInnerHTML(): Promise<string> {
    await this.waitTillVisible();
    return (await this.getLocator().innerHTML()).trim();
  }

  /**
   * Get inner text
   * @returns Promise<string>
   */
  public async getInnerText(): Promise<string> {
    const element = this.getLocator();
    await this.waitTillVisible();
    return (await element.innerText()).trim();
  }

 /**
  * checks if element is editable
  * @param sec 
  * @returns Promise<boolean>
  */
  public async isEditable(sec: number): Promise<boolean> {
    const element = this.getLocator();
    return await element.isEditable({ timeout: sec * 1000 });
  }

  /**
   * checks if element is enabled
   * @param sec
   * @returns Promise<boolean>
   */
  public async isEnabled(sec: number): Promise<boolean> {
    const element = this.getLocator();
    return await element.isEnabled({ timeout: sec * 1000 });
  }

  /**
   * checks if element is visible
   * @param sec time for element to be visible
   * @returns Promise<boolean>
   */
  public async isVisible(sec: number): Promise<boolean> {
    let visibility: boolean;
    try {
      visibility = await this.getLocator().isVisible({ timeout: sec * 1000 });
    } catch (error) {
      visibility = false;
    }
    return visibility;
  }

  /**
   * Press a key on web element
   * @param key
   * @returns Promise<UIElementActions>
   */
  public async keyPress(key: string): Promise<UIElementActions> {
    await this.getLocator().press(key);
    return this;
  }

  /**
   * Press a key on web element
   * @param text
   * @returns Promise<UIElementActions>
   */
  public async typeText(text: string, delay?: number): Promise<UIElementActions> {
    await this.getLocator().type(text, { delay: delay });
    return this;
  }

  /**
   * Get all the text Content
   * @returns Promise<string[]>
   */
  public async getAllTextContent(): Promise<string[]> {
    await this.waitTillVisible();
    return await this.getLocators().allTextContents();
  }

  /**
   * Get the count of
   * @returns Promise<number>
   */
  public async getCount(): Promise<number> {
    return await this.getLocators().count();
  }
  /**
   * Performs mouse click action on the element
   * @returns Promise<UIElementActions>
   */
  public async mouseClick(): Promise<UIElementActions> {
    await this.getLocator().scrollIntoViewIfNeeded();
    const box = await this.getLocator().boundingBox();
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    return this;
  }
  /**
   * Click on element using js
   * @returns Promise<UIElementActions>
   */
  public async jsClick(): Promise<UIElementActions> {
    await this.waitTillVisible();
    await this.getLocator().evaluate((node: HTMLElement) => { node.click(); });
    return this;
  }
}