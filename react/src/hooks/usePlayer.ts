import { useQuery } from "@tanstack/react-query";
import type { Player } from "../utils/types.ts";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { playerService } from "../services/playerService.ts";

export type PlayerRequest = {
  playerId: number;
  tokenValue: string;
};

export type PlayerResponse = Player;

type UsePlayerProps = {
  playerId: number;
};

export const usePlayer = ({ playerId }: UsePlayerProps) => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useQuery<PlayerResponse, Error>({
    queryKey: ["player"],
    queryFn: () =>
      playerService.getPlayerById({ playerId, tokenValue: tokenValue! }),
    enabled: !!tokenValue,
  });
};
