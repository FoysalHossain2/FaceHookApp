import { useState } from "react";
import { AuthContext } from "../Context";

const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
