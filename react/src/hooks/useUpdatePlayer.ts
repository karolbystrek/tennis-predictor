import type { Player } from "../utils/types.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { playerService } from "../services/playerService.ts";

export type UpdatePlayerRequest = {
  player: Player;
  tokenValue: string;
};

type UseUpdatePlayerProps = {
  player: Player;
};

export const useUpdatePlayer = ({ player }: UseUpdatePlayerProps) => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<void, Error, UpdatePlayerRequest>({
    mutationKey: ["UpdatePlayer", player],
    mutationFn: () =>
      playerService.updatePlayer({ player, tokenValue: tokenValue! }),
    onSuccess: () => {
      console.log("Player updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update player:", error.message);
    },
  });
};
