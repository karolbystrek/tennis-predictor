import { Outlet } from "react-router-dom";

export type PlayerContext = {
  value: string;
};

export const Players = () => {
  const ct: PlayerContext = { value: "Some Value" };
  return (
    <>
      <Outlet context={ct} />
      <h1>All Players</h1>
    </>
  );
};
