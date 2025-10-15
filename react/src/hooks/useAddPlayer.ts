import type { Player } from "../utils/types.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { playerService } from "../services/playerService.ts";

export type AddPlayerRequest = {
  player: Player;
  tokenValue: string;
};

type UseAddPlayerProps = {
  player: Player;
};

export const useAddPlayer = ({ player }: UseAddPlayerProps) => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<void, Error, AddPlayerRequest>({
    mutationKey: ["addPlayer", player],
    mutationFn: () =>
      playerService.addPlayer({ player, tokenValue: tokenValue! }),
    onSuccess: () => {
      console.log("Player added successfully");
    },
    onError: (error) => {
      console.error("Failed to add player:", error.message);
    },
  });
};
