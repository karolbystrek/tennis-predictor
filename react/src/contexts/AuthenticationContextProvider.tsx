import { createContext, type ReactNode, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { LoginResponse } from "../services/authenticationService.ts";

type AuthenticationContextType = {
  isAuthenticated: boolean;
  saveAuthentication: (loginResponse: LoginResponse) => void;
  clearAuthentication: () => void;
  getToken: () => string | null;
};

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

const TOKEN_KEY = "authToken";
const TOKEN_EXPIRY_KEY = "authTokenExpiry";

type AuthenticationContextProviderProps = {
  children: ReactNode;
};

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderProps) => {
  const [token, setToken] = useLocalStorage<string | null>(TOKEN_KEY, null);
  const [tokenExpiry, setTokenExpiry] = useLocalStorage<number | null>(
    TOKEN_EXPIRY_KEY,
    null,
  );
  const isAuthenticated =
    token !== null && tokenExpiry !== null && Date.now() < tokenExpiry;

  const getToken = () => {
    if (isAuthenticated) {
      return token;
    }
    return null;
  };

  const saveAuthentication = ({ token, expiresIn }: LoginResponse) => {
    const expiryTime = Date.now() + expiresIn * 1000;
    setToken(token);
    setTokenExpiry(expiryTime);
  };

  const clearAuthentication = () => {
    setToken(null);
    setTokenExpiry(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        getToken,
        isAuthenticated,
        saveAuthentication,
        clearAuthentication,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthenticationContext must be used within an AuthenticationContextProvider",
    );
  }
  return context;
};
