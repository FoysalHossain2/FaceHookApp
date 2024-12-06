import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Logo from "../../assets/images/logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";
import Logout from "../auth/Logout";

const Header = () => {
  const { Auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? Auth?.user;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
        <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* <!-- Logo --> */}
          <Link to="/">
            <img
              className="max-w-[100px] rounded-full lg:max-w-[130px]"
              src={Logo}
            />
          </Link>
          {/* <!-- nav links  --> */}

          <div className="flex items-center space-x-4">
            <Link to="/" className="btn-primary">
              <img src={HomeIcon} alt="Home" />
              Home
            </Link>
            <button className="icon-btn">
              <img src={Notification} alt="Notification" />
            </button>

            {/* logout page ... */}
            <Logout />

            <Link to={"/me"}>
              <span className="text-lg font-medium lg:text-xl">
                {state?.user?.firstName} {state?.user?.lastName}
              </span>
              <img
                className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`}
                alt="avatar"
              />
            </Link>
          </div>
          {/* <!-- nav links ends --> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
