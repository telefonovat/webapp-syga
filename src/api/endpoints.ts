import { webappConfig } from "@/config";

const debugAPIPrefix = `http://localhost:${webappConfig.API_PORT}`;
const DEBUG = true;

if (DEBUG) {
  console.log(`DEBUG MODE ON......`);
  console.log(`Prefix for API URL is ${debugAPIPrefix}`);
}

export const buildUrl = `${DEBUG ? debugAPIPrefix : ""}/algorithm/build`;
export const signinUrl = `${DEBUG ? debugAPIPrefix : ""}/signin`;
