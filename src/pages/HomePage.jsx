import React, { useEffect, useReducer } from "react";
import { actions } from "../actions";
import useAxios from "../hooks/useAxios";
import PostList from "../posts/PostList";
import { initialState, postReducer } from "../reducers/PostReducer";

const HomePage = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);

        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };

    fetchPost();
  }, []);

  if (state?.loading) {
    return <div>We are Working...</div>;
  }

  if (state?.error) {
    return <div>Error in fetching posts {state?.error?.message}</div>;
  }

  return (
    <>
      <PostList posts={state?.posts} />
    </>
  );
};

export default HomePage;
