import { webappConfig } from "@/config";

const debugAPIPrefix = `http://localhost:${webappConfig.API_PORT}`;
const DEBUG = webappConfig.DEV;

if (DEBUG) {
  console.log(`DEBUG MODE ON......`);
  console.log(`Prefix for API URL is ${debugAPIPrefix}`);
}

const prefix = webappConfig.API_URL;

// Static urls
export const buildUrl = `${prefix}/algorithm/build`;
export const signinUrl = `${prefix}/signin`;
export const algorithmsUrl = `${prefix}/algorithms`;
export const verifyAuthUrl = `${prefix}/auth`;
export const refreshTokenUrl = `${prefix}/refresh-token`;

// Dynamic urls
export const getUserAlgorithmsUrl = (targetUsername: string) =>
  `${prefix}/${targetUsername}/algorithms`;

export const getAlgorithmResourceUrl = (uuid: string) =>
  `${prefix}/algorithm/${uuid}`;

//TODO: Convert to configurable parameter
export const globalUrlPrefix = DEBUG ? debugAPIPrefix : "";

export function getGlobalUrl(path: string) {
  return globalUrlPrefix + path;
}
