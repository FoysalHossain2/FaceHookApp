import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/common/Header";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { Auth } = useAuth();

  return (
    <>
      {Auth.user ? (
        <main className="mx-auto max-w-[1020px py-8]">
          <div className="container">
            {" "}
            <Header />
            <Outlet />{" "}
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
