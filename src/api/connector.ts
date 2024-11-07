import { VisualizationRequest } from '@/shared-types/visualization/VisualizationRequest';
import { VisualizationResult } from '@/shared-types/visualization/VisualizationResult';

const REST_API = 'http://localhost:8020';
const BUILD_ENDPOINT = '/algorithm/execute';
//TODO: More specific return typing
async function buildCode(
  visualizationRequest: VisualizationRequest
): Promise<VisualizationResult> {
  const { code } = visualizationRequest;
  try {
    const res = await fetch(REST_API + BUILD_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    });
    const visualizationResult: VisualizationResult = await res.json();
    console.log(visualizationResult);
    return visualizationResult;
  } catch (err) {
    console.error('Error occurred:', err);

    throw new Error('No response from REST API');
  }
}

export { buildCode };
