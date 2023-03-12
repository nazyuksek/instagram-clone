import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface AuthenticationContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export const AuthenticationContext =
  createContext<AuthenticationContextValue>(defaultState);

interface AuthenticationProps {
  children: ReactNode;
}

export function AuthenticationProvider({ children }: AuthenticationProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
