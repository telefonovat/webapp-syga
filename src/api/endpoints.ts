const debugAPIPrefix = "http://localhost:8100";
const DEBUG = true;

export const buildUrl = `${DEBUG ? debugAPIPrefix : ""}/algorithm/build`;
