import { expect } from '@playwright/test';

/**
 * This class contains all the assertions that can be used in the test cases
 * Using Playwright's expect() methods
 */

export default class Assert {
  /**
     * To verify actual equals expected
     * @param actual any object
     * @param expected any object to compare
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertEquals(actual: unknown, expected: unknown, softAssert = false) {
    try {
        expect(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
  }

  /**
     * To verify that value1 contains value2
     * @param actual - string input
     * @param expected - should be present in value1
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertContains(actual: string, expected:  string, softAssert = false) {
    try {
        expect(actual, `'${actual}' is expected to CONTAIN '${expected}'`).toContain(expected);
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
  }

  /**
     * To verify that condition passed as input is true
     * @param condition - boolean condition
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertTrue(condition: boolean, softAssert = false) {
    try {
        expect(condition, `Expected is 'True' & Actual is '${condition}'`).toBeTruthy();
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
  }

  /**
     * To verify that actual passed as input is false
     * @param condition boolean
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertFalse(condition: boolean, softAssert = false) {
    try {
        expect(condition, `Expected is 'false' & Acutal is '${condition}'`).toBeFalsy();
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
  }

  /**
    * To verify that element not contains expected
    * @param actual any value 
    * @param expected any value
    * @param description description of element that is being validated
    * @param softAssert for soft asserts this has to be set to true, else this can be ignored
    */
  public static async assertNotContains(actual: unknown, expected: unknown, softAssert = false) {
    try {
        await expect(actual, `'${actual}' should NOT CONTAIN '${expected}'`).not.toContain(expected);
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
  }

  /**
     * To verify actual not equals to expected
     * @param actual any object
     * @param expected any object to compare
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertNotEquals(actual: unknown, expected: unknown, softAssert = false) {
    try {
        expect(actual, `Expected '${expected}' should NOT be EQUAL to Actual '${actual}'`).not.toEqual(expected);
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
  }
}