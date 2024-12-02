import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { Auth } = useAuth();
  console.log(Auth);

  return (
    <>
      <Link to="/me">Go to Profile Page</Link>
    </>
  );
};

export default HomePage;
