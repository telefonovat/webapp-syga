import { webappConfig } from "@/config";

const debugAPIPrefix = `http://localhost:${webappConfig.API_PORT}`;
const DEBUG = true;

export const buildUrl = `${DEBUG ? debugAPIPrefix : ""}/algorithm/build`;
