import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { NotFound } from "./pages/NotFound.tsx";
import { Prediction } from "./pages/Prediction.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContextProvider.tsx";
import { NavBar } from "./components/NavBar.tsx";
import { Account } from "./pages/Account.tsx";
import { ApplicationContextProvider } from "./contexts/ApplicationContextProvider.tsx";
import { ProtectedRoutes } from "./routes/ProtectedRoutes.tsx";
import { PlayerRoutes } from "./routes/PlayerRoutes.tsx";

function App() {
  return (
    <ApplicationContextProvider>
      <AuthenticationContextProvider>
        <NavBar />
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/predictions"} element={<Prediction />} />
            <Route path={"/players/*"} element={<PlayerRoutes />} />
            <Route path={"/account"} element={<Account />} />
            <Route path={"*"} element={<NotFound />} />
          </Route>
        </Routes>
      </AuthenticationContextProvider>
    </ApplicationContextProvider>
  );
}

export default App;
