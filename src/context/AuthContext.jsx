import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //useState는 새로고침하면 항상 새로운 정보를 가져와야
  useEffect(() => {
    onUserStateChange((user) => {
      setIsLoading(false);
      console.log(user);
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
