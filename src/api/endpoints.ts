import { webappConfig } from "@/config";

const debugAPIPrefix = `http://localhost:${webappConfig.API_PORT}`;
const DEBUG = true;

if (DEBUG) {
  console.log(`DEBUG MODE ON......`);
  console.log(`Prefix for API URL is ${debugAPIPrefix}`);
}

const prefix = DEBUG ? debugAPIPrefix : "";

// Static urls
export const buildUrl = `${prefix}/algorithm/build`;
export const signinUrl = `${prefix}/signin`;
export const algorithmsUrl = `${prefix}/algorithms`;

// Dynamic urls
export const getUserAlgorithmsUrl = (targetUsername: string) =>
  `${prefix}/${targetUsername}/algorithms`;

export const getAlgorithmDetailUrl = (uuid: string) =>
  `${prefix}/algorithm/${uuid}`;
