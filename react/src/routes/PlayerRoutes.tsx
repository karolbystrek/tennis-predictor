import { Route, Routes } from "react-router-dom";
import { Players } from "../pages/players/Players.tsx";
import { AddPlayer } from "../pages/players/AddPlayer.tsx";
import { DeletePlayer } from "../pages/players/DeletePlayer.tsx";
import { UpdatePlayer } from "../pages/players/UpdatePlayer.tsx";
import { RoleGuard } from "../components/RoleGuard.tsx";
import { PlayerNotFound } from "../pages/players/PlayerNotFound.tsx";

export const PlayerRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route index element={<Players />} />
        <Route
          path={"add"}
          element={
            <RoleGuard allowedRoles={["ADMIN"]}>
              <AddPlayer />
            </RoleGuard>
          }
        />
        <Route
          path={"delete/:playerId"}
          element={
            <RoleGuard allowedRoles={["ADMIN"]} showError>
              <DeletePlayer />
            </RoleGuard>
          }
        />
        <Route
          path={"update/:playerId"}
          element={
            <RoleGuard allowedRoles={["ADMIN"]}>
              <UpdatePlayer />
            </RoleGuard>
          }
        />
        <Route path={"*"} element={<PlayerNotFound />} />
      </Route>
    </Routes>
  );
};
