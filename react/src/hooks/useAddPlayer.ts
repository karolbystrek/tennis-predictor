import type { Player } from "../utils/types.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { playerService } from "../services/playerService.ts";

export type AddPlayerRequest = {
  player: Omit<Player, "id" | "rank" | "age" | "rankPoints">;
  tokenValue: string;
};

export const useAddPlayer = () => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useMutation<void, Error, AddPlayerRequest>({
    mutationKey: ["addPlayer"],
    mutationFn: (request: AddPlayerRequest) =>
      playerService.addPlayer({
        player: request.player,
        tokenValue: request.tokenValue || tokenValue!,
      }),
  });
};
