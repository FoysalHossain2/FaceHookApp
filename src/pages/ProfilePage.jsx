import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [Posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  const { api } = useAxios();
  const { Auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${Auth?.user?.id}`
        );
        setUser(response?.data?.user);
        setPosts(response?.data?.Posts);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (Loading) {
    return <div>Fetching Your Profile data...</div>;
  }

  return (
    <>
      <h1>profile</h1>
      <div>{user?.firstName}</div>
    </>
  );
};

export default ProfilePage;
