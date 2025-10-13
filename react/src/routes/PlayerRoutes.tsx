import { Route, Routes } from "react-router-dom";
import { Players } from "../pages/players/Players.tsx";
import { AddPlayer } from "../pages/players/AddPlayer.tsx";
import { DeletePlayer } from "../pages/players/DeletePlayer.tsx";
import { UpdatePlayer } from "../pages/players/UpdatePlayer.tsx";

export const PlayerRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Players />} />
        <Route path={"add"} element={<AddPlayer />} />
        <Route path={"delete/:playerId"} element={<DeletePlayer />} />
        <Route path={"update/:playerId"} element={<UpdatePlayer />} />
      </Route>
    </Routes>
  );
};
