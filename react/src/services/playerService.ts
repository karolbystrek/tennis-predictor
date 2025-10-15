import { API_BASE_URL } from "./authenticationService.ts";
import type { PlayersRequest, PlayersResponse } from "../hooks/usePlayers.ts";

const API_PLAYERS_ENDPOINT = "/api/players";

export const playerService = {
  getAllPlayers: async ({
    tokenValue,
  }: PlayersRequest): Promise<PlayersResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_PLAYERS_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch players");
    }
    return response.json();
  },
};
