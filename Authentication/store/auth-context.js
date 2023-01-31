import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {}, // 사용자가 가입에 성공하거나 로그인 하면 되는 트리거
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken(null);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
