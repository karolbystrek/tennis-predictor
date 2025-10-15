import { API_BASE_URL } from "./authenticationService.ts";
import type { PlayersRequest, PlayersResponse } from "../hooks/usePlayers.ts";
import type { PlayerRequest, PlayerResponse } from "../hooks/usePlayer.ts";
import type { DeletePlayerRequest } from "../hooks/useDeletePlayer.ts";
import type { AddPlayerRequest } from "../hooks/useAddPlayer.ts";
import type { UpdatePlayerRequest } from "../hooks/useUpdatePlayer.ts";

const API_PLAYERS_ENDPOINT = "/api/players";

export const playerService = {
  getPlayerById: async ({
    playerId,
    tokenValue,
  }: PlayerRequest): Promise<PlayerResponse> => {
    console.log(`Fetching player with ID: ${playerId}`);
    const response = await fetch(
      `${API_BASE_URL}${API_PLAYERS_ENDPOINT}/${playerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch player");
    }
    return response.json();
  },
  getAllPlayers: async ({
    tokenValue,
  }: PlayersRequest): Promise<PlayersResponse> => {
    console.log("Fetching all players");
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
  addPlayer: async ({
    player,
    tokenValue,
  }: AddPlayerRequest): Promise<void> => {
    console.log("Adding player:", player);
    const response = await fetch(`${API_BASE_URL}${API_PLAYERS_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      throw new Error("Failed to add player");
    }
    return;
  },
  updatePlayer: async ({
    player,
    tokenValue,
  }: UpdatePlayerRequest): Promise<void> => {
    console.log("Updating player:", player);
    const response = await fetch(
      `${API_BASE_URL}${API_PLAYERS_ENDPOINT}/${player.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
        body: JSON.stringify(player),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update player");
    }
    return;
  },
  deletePlayer: async ({
    playerId,
    tokenValue,
  }: DeletePlayerRequest): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}${API_PLAYERS_ENDPOINT}/${playerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to delete player");
    }
    return;
  },
};
