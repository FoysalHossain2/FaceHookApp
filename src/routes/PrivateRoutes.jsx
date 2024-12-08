import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Components/common/Header";
import { useAuth } from "../hooks/useAuth";
import PostProvider from "../providers/PostProvider";
import ProfileProvider from "../providers/ProfileProvider";

const PrivateRoutes = () => {
  const { Auth } = useAuth();

  return (
    <>
      {Auth.authToken ? (
        <>
          <PostProvider>
            <ProfileProvider>
              <Header />
              <main className="mx-auto max-w-[1020px py-8]">
                <div className="container">
                  {" "}
                  <Outlet />{" "}
                </div>
              </main>
            </ProfileProvider>
          </PostProvider>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
