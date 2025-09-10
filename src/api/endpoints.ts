import { webappConfig } from "@/config";

const debugAPIPrefix = `http://localhost:${webappConfig.API_PORT}`;
const DEBUG = true;

if (DEBUG) {
  console.log(`DEBUG MODE ON......`);
  console.log(`Prefix for API URL is ${debugAPIPrefix}`);
}

// Static urls
export const buildUrl = `${DEBUG ? debugAPIPrefix : ""}/algorithm/build`;
export const signinUrl = `${DEBUG ? debugAPIPrefix : ""}/signin`;

// Dynamic urls
export const getUserAlgorithmsUrl = (targetUsername: string) =>
  `${DEBUG ? debugAPIPrefix : ""}/${targetUsername}/algorithms`;
