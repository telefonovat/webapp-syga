interface WebappConfig {
  API_PORT: number;
  API_URL: string;
  DEV: boolean;
}
export const webappConfig: WebappConfig = {
  API_PORT: import.meta.env.VITE_API_PORT || 8100,
  API_URL: import.meta.env.VITE_API_URL || "/api",
  DEV: import.meta.env.DEV,
};
