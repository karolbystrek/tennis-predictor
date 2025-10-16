import type { Player } from "./types.ts";
import type { PlayerFormData } from "../hooks/usePlayerForm.ts";

export const playerToFormData = (player: Player): PlayerFormData => {
  return {
    firstName: player.firstName,
    lastName: player.lastName,
    hand: player.hand,
    dateOfBirth: new Date(player.dateOfBirth).toISOString().split("T")[0],
    ioc: player.ioc,
    height: String(player.height),
    elo: String(player.elo),
    eloHard: String(player.eloHard),
    eloGrass: String(player.eloGrass),
    eloCarpet: String(player.eloCarpet),
    eloClay: String(player.eloClay),
  };
};
