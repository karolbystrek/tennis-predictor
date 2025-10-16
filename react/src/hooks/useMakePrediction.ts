import { useMutation } from "@tanstack/react-query";
import { predictionService } from "../services/predictionService.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";

export type PredictionRequest = {
  player1Id: number;
  player2Id: number;
  surface: string;
  tourneyLevel: string;
  bestOf: number;
  round: string;
  tokenValue: string;
};

export type PredictionResponse = {
  player1Name: string;
  player2Name: string;
  player1WinProbability: number;
  player2WinProbability: number;
  winnerName: string;
  winnerId: number;
  confidence: number;
};

export const useMakePrediction = () => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<PredictionResponse, Error, PredictionRequest>({
    mutationKey: ["makePrediction"],
    mutationFn: (request: PredictionRequest) =>
      predictionService.makePrediction({
        ...request,
        tokenValue: request.tokenValue || tokenValue!,
      }),
  });
};
