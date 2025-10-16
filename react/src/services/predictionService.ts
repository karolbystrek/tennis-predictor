import type {
  PredictionRequest,
  PredictionResponse,
} from "../hooks/useMakePrediction.ts";
import { API_BASE_URL } from "./authenticationService.ts";

const API_PREDICTION_ENDPOINT = "/api/predictions";

export const predictionService = {
  makePrediction: async (
    request: PredictionRequest,
  ): Promise<PredictionResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_PREDICTION_ENDPOINT}`, {
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
