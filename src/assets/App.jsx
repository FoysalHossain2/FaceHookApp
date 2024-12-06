import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";

const App = () => {
  return (
    <>
      <Route>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<ProfilePage />} path="/me" />
        <Route element={<RegistrationPage />} path="register" />
      </Route>
    </>
  );
};

export default App;
