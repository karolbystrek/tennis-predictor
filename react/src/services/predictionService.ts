import type {
  PredictionRequest,
  PredictionResponse,
} from "../hooks/useMakePrediction.ts";
import { ENDPOINTS } from "../config/api.ts";

export const predictionService = {
  makePrediction: async (
    request: PredictionRequest,
  ): Promise<PredictionResponse> => {
    const response = await fetch(`${ENDPOINTS.PREDICT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.tokenValue}`,
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error("Failed to make prediction");
    }
    return response.json();
  },
};
