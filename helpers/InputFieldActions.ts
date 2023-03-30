import { Locator } from "@playwright/test";
import UIElementActions from "./UIElementActions";

export default class InputFieldActions extends UIElementActions {
  /**
   * Sets the selector with description
   * @param selector
   * @param description
   * @returns InputFieldActions
   */
  public setInputField(selector: string, description: string): InputFieldActions {
    this.setElement(selector, description);
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @returns InputFieldActions
   */
  public setLocator(locator: Locator, description: string): InputFieldActions {
    super.setLocator(locator, description);
    return this;
  }

  /**
   * Clear and enter text
   * @param value
   * @returns Promise<InputFieldActions>
   */
  public async fill(value: string): Promise<InputFieldActions> {
    await this.getLocator().fill(value);
    return this;
  }

  /**
   * Types the value to text field
   * @param value
   * @returns Promise<InputFieldActions>
   */
  public async type(value: string): Promise<InputFieldActions> {
    await this.getLocator().type(value);
    return this;
  }

  /**
   * Enter text and hit tab key
   * @param value
   * @returns Promise<InputFieldActions>
   */
  public async fillAndTab(value: string): Promise<InputFieldActions> {
    await this.getLocator().fill(value);
    await this.getLocator().press("Tab");
    return this;
  }

  /**
   * Typing text and hit tab key
   * @param value
   * @returns Promise<InputFieldActions>
   */
  public async typeAndTab(value: string): Promise<InputFieldActions> {
    await this.getLocator().type(value);
    await this.getLocator().press("Tab");
    return this;
  }
}
