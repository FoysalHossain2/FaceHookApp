import React, { useState } from "react";
import ThreeDotsIcon from "../assets/icons/3dots.svg";
import EditIcon from "../assets/icons/edit.svg";
import {
  default as DeleteIcon,
  default as TimeIcon,
} from "../assets/icons/time.svg";
import { useAvatar } from "../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../utils";

const PostHeader = ({ post }) => {
  const [ShowActin, setShowActin] = useState(false);
  const { avatarURL } = useAvatar(post);

  const toggleAction = () => {
    setShowActin(!ShowActin);
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
            <button onClick={toggleAction}>
              <img src={ThreeDotsIcon} alt="3dots of Action" />
            </button>

            {ShowActin && (
              <div className="action-modal-container ">
                <button className="action-menu-item hover:text-lwsGreen">
                  <img src={EditIcon} alt="Edit" />
                  Edit
                </button>
                <button className="action-menu-item hover:text-red-500">
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
