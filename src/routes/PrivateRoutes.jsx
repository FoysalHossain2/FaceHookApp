import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/common/Header";
import { useAuth } from "../hooks/useAuth";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { Auth } = useAuth();

  return (
    <>
      {Auth.authToken ? (
        <>
          <ProfileProvider>
            <Header />
            <main className="mx-auto max-w-[1020px py-8]">
              <div className="container">
                {" "}
                <Outlet />{" "}
              </div>
            </main>
          </ProfileProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
