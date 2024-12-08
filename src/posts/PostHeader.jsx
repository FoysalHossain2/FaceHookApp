import React, { useState } from "react";
import { actions } from "../actions";
import api from "../api";
import ThreeDotsIcon from "../assets/icons/3dots.svg";
import EditIcon from "../assets/icons/edit.svg";
import {
  default as DeleteIcon,
  default as TimeIcon,
} from "../assets/icons/time.svg";
import { useAuth } from "../hooks/useAuth";
import { useAvatar } from "../hooks/useAvatar";
import { usePost } from "../hooks/usePost";
import { getDateDifferenceFromNow } from "../utils";

const PostHeader = ({ post }) => {
  const [ShowActin, setShowActin] = useState(false);
  const { avatarURL } = useAvatar(post);
  const { Auth } = useAuth();
  const { dispatch } = usePost;

  const isMe = post?.author?.id === Auth?.user?.id;

  const toggleAction = () => {
    setShowActin(!ShowActin);
  };

  const HandleDeletePost = async () => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };

  return (
    <>
      <div>
        <header className="flex items-center justify-between gap-4">
          {/* <!-- author info --> */}
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={avatarURL}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
              <div className="flex items-center gap-1.5">
                <img src={TimeIcon} alt="time" />
                <span className="text-sm text-gray-400 lg:text-base">
                  {`${getDateDifferenceFromNow(post?.createAt)} ago`}
                </span>
              </div>
            </div>
          </div>
          {/* <!-- author info ends --> */}

          <div className="relative">
            {isMe && (
              <button onClick={toggleAction}>
                <img src={ThreeDotsIcon} alt="3dots of Action" />
              </button>
            )}

            {ShowActin && (
              <div className="action-modal-container ">
                <button className="action-menu-item hover:text-lwsGreen">
                  <img src={EditIcon} alt="Edit" />
                  Edit
                </button>
                <button
                  onClick={HandleDeletePost}
                  className="action-menu-item hover:text-red-500"
                >
                  <img src={DeleteIcon} alt="Delete" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default PostHeader;
