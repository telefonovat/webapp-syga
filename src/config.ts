interface WebappConfig {
  API_PORT: number;
}

export const webappConfig: WebappConfig = {
  API_PORT: import.meta.env.VITE_API_PORT || 8100,
};
