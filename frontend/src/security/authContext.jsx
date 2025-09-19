import React, { createContext, useState, useContext } from "react";

/*AUTH CONTEXT: Create a context to manage authentication state (accessToken) across the app*/
/*AuthProvider component wraps the app and provides accessToken state and setter function*/
/*useAuth hook allows components to easily access auth context values*/
/*Initial context value has accessToken as null and a placeholder setAccessToken function*/
/*AuthProvider manages accessToken state and provides it via context to children components*/
const AuthContext = createContext({
  accessToken: null,
  setAccessToken: () => {}
});

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider rendering");
  const [accessToken, setAccessToken] = useState();

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
