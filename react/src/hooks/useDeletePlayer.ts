import { useMutation } from "@tanstack/react-query";
import { playerService } from "../services/playerService.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";

export type DeletePlayerRequest = {
  playerId: number;
  tokenValue: string;
};

type UseDeletePlayerProps = {
  playerId: number;
};

export const useDeletePlayer = ({ playerId }: UseDeletePlayerProps) => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<void, Error, DeletePlayerRequest>({
    mutationKey: ["deletePlayer", playerId],
    mutationFn: () =>
      playerService.deletePlayer({ playerId, tokenValue: tokenValue! }),
    onSuccess: () => {
      console.log(`Player ${playerId} deleted successfully.`);
    },
    onError: (error) => {
      console.error("Failed to delete player:", error.message);
    },
  });
};
