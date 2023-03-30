import { Locator } from '@playwright/test';
import CommonConstants from '../config/CommonConstants';

export default class DropDownActions {
  private locator: Locator;
  private description: string;

  /**
   * Sets the locator with description
   * @param locator
   * @param description
   * @returns DropDownActions
   */
  public setLocator(locator: Locator, description: string): DropDownActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * Select the dropdown by value
   * @param value
   * @returns Promise<DropDownActions>
   */
  public async selectByValue(value: string): Promise<DropDownActions> {
    await this.locator.selectOption({ value });
    return this;
  }

  /**
   * Select the dropdown by Label
   * @param text
   * @returns Promise<DropDownActions>
   */
  public async selectByVisibleText(text: string): Promise<DropDownActions> {
    await this.locator.selectOption({ label: text });
    return this;
  }

  /**
   * Select the dropdown by index
   * @param index
   * @returns Promise<DropDownActions>
   */
  public async selectByIndex(index: number): Promise<DropDownActions> {
    await this.locator.selectOption({ index });
    return this;
  }

  /**
   * @TODO
   * Gets all the options in dropdown
   * @param index
   * @returns
   */
  // public async getAllOptions(): Promise<string[]> {
  //   await this.locator.waitFor({state: "visible", timeout: CommonConstants.WAIT});
  //   return await this.locator.locator(HTMLConstants.OPTION).allTextContents();
  // }

  /** 
   * @TODO
   * Gets all the selected options in dropdown
   * @param index
   * @returns
   */
  // public async getAllSelectedOptions(): Promise<string[]> {
  //   await this.locator.waitFor({ state: "visible", timeout: CommonConstants.WAIT });
  //   return await this.locator.locator(HTMLConstants.SELECTED_OPTION).allTextContents();
  // }
}
