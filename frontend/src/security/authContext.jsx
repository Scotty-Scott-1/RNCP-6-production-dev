import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext({
  accessToken: null,
  setAccessToken: () => {}
});

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider rendering");
  const [accessToken, setAccessToken] = useState();
  const [tempMfaToken, setTempMfaToken] = useState();


  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, tempMfaToken, setTempMfaToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
