import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';
import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';

const API_BASE = import.meta.env.VITE_API_BASE;
const BUILD_ENDPOINT = import.meta.env.VITE_BUILD_ENDPOINT;

class APIClient {
  constructor() {}

  async buildCode(
    visualizationRequest: VisualizationRequest
  ): Promise<VisualizationResult> {
    const { code } = visualizationRequest;

    try {
      const res = await fetch(BUILD_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      const visualizationResult: VisualizationResult =
        await res.json();
      return visualizationResult;
    } catch (err) {
      console.error('Error occurred:', err);

      throw new Error('No response from REST API');
    }
  }
}

const apiClient = new APIClient();
export { apiClient };
