import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const HandleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  return (
    <>
      <button className="icon-btn" onClick={HandleLogout}>
        <img src={LogoutIon} alt="Logout" />
      </button>
    </>
  );
};

export default Logout;
