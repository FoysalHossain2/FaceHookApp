import { useEffect } from "react";
import { actions } from "../actions";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";
import MyPosts from "../profile/MyPosts";
import ProfileInfo from "../profile/ProfileInfo";

const ProfilePage = () => {
  const { state, dispatch } = useProfile();

  const { api } = useAxios();
  const { Auth } = useAuth();

  useEffect(() => {
    dispatch({ type: actions.profile.DATA_FETCHED });

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${Auth?.user?.id}`
        );
        if (response.status === 200) {
          dispatch({ type: actions.profile.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchProfile();
  }, []);

  if (state.Loading) {
    return <div>Fetching Your Profile data...</div>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
};

export default ProfilePage;
