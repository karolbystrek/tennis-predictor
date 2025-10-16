import { useQuery } from "@tanstack/react-query";
import { useAuthenticationContext } from "../contexts/AuthenticationContextProvider.tsx";
import { playerService } from "../services/playerService.ts";
import type { Player } from "../utils/types.ts";

export type PlayersRequest = {
  tokenValue: string;
};

export type PlayersResponse = Player[];

export const usePlayers = () => {
  const { getTokenValue } = useAuthenticationContext();
  const tokenValue = getTokenValue();

  return useQuery<Player[], Error>({
    queryKey: ["players"],
    queryFn: () => playerService.getAllPlayers({ tokenValue: tokenValue! }),
    enabled: !!tokenValue,
  });
};
