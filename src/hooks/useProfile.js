import { useContext } from "react";
import { ProfileContext } from "../Context";

export const useProfile = () => {
    return useContext(ProfileContext)
}