import { useContext } from "react";
import { PostContext } from "../Context";

export const usePost = () => {
    return useContext(PostContext)
}