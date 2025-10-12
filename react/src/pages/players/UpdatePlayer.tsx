import { useParams } from "react-router-dom";

export const UpdatePlayer = () => {
  const { playerId } = useParams();
  return <h1>Update player {playerId} page</h1>;
};
