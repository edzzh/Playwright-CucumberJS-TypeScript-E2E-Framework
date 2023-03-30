import * as dotenv from "dotenv";

const envConfig = dotenv.config().parsed;

export enum CommonConstants {
  WAIT = parseInt(envConfig.WAIT_TIME, 10) * 60000,
}