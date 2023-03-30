import { test, expect } from '@playwright/test';


export default class Assert {
  /**
     * To verify actual equals expected
     * @param value1 any object
     * @param value2 any object to compare
     * @param description object description
     * @param softAssert for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertEquals(actual: any, expected: any, softAssert = false) {
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
     * @param value1 - string input
     * @param value2 - should be present in value1
     * @param description - description of element that is being validated
     * @param softAssert - for soft asserts this has to be set to true, else this can be ignored
     */
  public static async assertContains(value1: string, value2:  string, softAssert = false) {
    try {
        expect(value1, `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2);
    } catch (error) {
        if (!softAssert) {
            throw new Error(error);
        }
    }
}
}