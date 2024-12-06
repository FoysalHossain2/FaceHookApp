import React, { useState } from "react";
import { useAvatar } from "../hooks/useAvatar";
import PostCommentList from "./PostCommentList";

const PostComments = ({ post }) => {
  const [ShowComments, setShowComments] = useState(false);
  const { avatarURL } = useAvatar(post);

  const toggleShowComment = () => {
    setShowComments(!ShowComments);
  };

  return (
    <>
      {" "}
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div class="mt-4">
        <button
          class="text-gray-300 max-md:text-sm"
          onClick={toggleShowComment}
        >
          All Comment ▾
        </button>
      </div>
      {ShowComments && <PostCommentList comments={post?.comments} />}
    </>
  );
};

export default PostComments;
