import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;

export default class CommonConstants {
  static readonly WAIT = parseInt(envConfig.TEST_TIMEOUT, 10) * 60000;
  static readonly DOWNLOAD_PATH = './downloads';
}