import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/Signup.tsx";
import { NavBar } from "./pages/NavBar.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Prediction } from "./pages/Prediction.tsx";
import { PlayerRoutes } from "./pages/players/PlayerRoutes.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <Routes>
      <Route path={"/signup"} element={<Signup />} />
      <Route path={"/login"} element={<Login />} />
      <Route element={<NavBar />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/predictions"} element={<Prediction />} />
        <Route path={"/players/*"} element={<PlayerRoutes />} />
      </Route>
      <Route path={"*"} element={<NotFound />} />
    </Routes>
  );
}

export default App;
