import type { Player } from "../utils/types.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { playerService } from "../services/playerService.ts";

export type UpdatePlayerRequest = {
  player: Omit<Player, "id" | "rank" | "age" | "rankPoints">;
  tokenValue: string;
};

export const useUpdatePlayer = () => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<void, Error, UpdatePlayerRequest>({
    mutationKey: ["updatePlayer"],
    mutationFn: (request: UpdatePlayerRequest) =>
      playerService.updatePlayer({
        player: request.player,
        tokenValue: request.tokenValue || tokenValue!,
      }),
  });
};
