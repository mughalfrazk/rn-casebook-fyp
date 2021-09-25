// In App.js in a new project

import React, { useContext, useEffect } from "react";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import MainStack from "./routes/MainStack";
import "react-native-url-polyfill/auto";

function App() {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <MainStack />
    </AuthContext.Provider>
  );
}

export default App;
