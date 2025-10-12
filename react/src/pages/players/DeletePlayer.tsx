import { useOutletContext, useParams } from "react-router-dom";
import type { PlayerContext } from "./Players.tsx";

export const DeletePlayer = () => {
  const { playerId } = useParams();
  const { value } = useOutletContext<PlayerContext>();
  return (
    <h1>
      Delete Player {playerId} Page ({value})
    </h1>
  );
};
