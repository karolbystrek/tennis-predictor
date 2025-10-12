import { Route, Routes } from "react-router-dom";
import { AddPlayer } from "./AddPlayer.tsx";
import { DeletePlayer } from "./DeletePlayer.tsx";
import { UpdatePlayer } from "./UpdatePlayer.tsx";
import { Players } from "./Players.tsx";

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
