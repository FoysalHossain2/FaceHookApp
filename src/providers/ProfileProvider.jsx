import { useReducer } from "react";
import { ProfileContext } from "../Context";
import { initialState, profileReducer } from "../reducers/ProfileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;