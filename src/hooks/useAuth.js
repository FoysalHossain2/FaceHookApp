import { useContext, useDebugValue } from "react";
import { AuthContext } from "../Context";

export const useAuth = () => {

    const {Auth} = useContext(AuthContext)
    useDebugValue(Auth, Auth=> Auth?.user ? "User Logged in" : "User Logged out")
    return useContext(AuthContext)
}