import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { actions } from "../actions";
import api from "../api";
import EditIcon from "../assets/icons/edit.svg";
import { useProfile } from "../hooks/useProfile";

const Bio = () => {
  const { state, dispatch } = useProfile();

  const [BoiShow, setBoiShow] = useState(state?.user?.bio);
  const [EditMode, setEditMode] = useState(false);

  const HandleBioEdit = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { BoiShow }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <>
      {" "}
      <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
          {!EditMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
              {state?.user?.BoiShow}
            </p>
          ) : (
            <textarea
              className="p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md"
              value={BoiShow}
              rows={4}
              cols={55}
              onChange={(e) => setBoiShow(e.target.value)}
            />
          )}
        </div>

        {!EditMode ? (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={() => setEditMode(true)}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        ) : (
          <button
            className="flex-center h-7 w-7 rounded-full"
            onClick={HandleBioEdit}
          >
            <FaCheck />
          </button>
        )}
      </div>
    </>
  );
};

export default Bio;
