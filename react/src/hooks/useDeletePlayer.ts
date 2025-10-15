import { useMutation } from "@tanstack/react-query";
import { playerService } from "../services/playerService.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";

export type DeletePlayerRequest = {
  playerId: number;
  tokenValue: string;
};

export const useDeletePlayer = () => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<void, Error, DeletePlayerRequest>({
    mutationKey: ["deletePlayer"],
    mutationFn: (request: DeletePlayerRequest) =>
      playerService.deletePlayer({
        playerId: request.playerId,
        tokenValue: request.tokenValue || tokenValue!,
      }),
  });
};
