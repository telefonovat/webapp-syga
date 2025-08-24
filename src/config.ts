interface WebappConfig {
  API_PORT: number;
}

export const webappConfig: WebappConfig = {
  API_PORT: import.meta.env.API_PORT || 8100,
};
