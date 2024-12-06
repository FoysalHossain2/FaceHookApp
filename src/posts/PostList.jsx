import React from "react";
import Postcard from "./Postcard";

const PostList = ({ posts }) => {
  return (
    <>
      {!!posts && posts.map((post) => <Postcard key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
