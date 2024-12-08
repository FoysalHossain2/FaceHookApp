import React from "react";
import { useForm } from "react-hook-form";
import { actions } from "../actions";
import AddPhoto from "../assets/icons/addPhoto.svg";
import Field from "../Components/common/Field";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { usePost } from "../hooks/usePost";
import { useProfile } from "../hooks/useProfile";

const PostEntry = ({ onCreate }) => {
  const { Auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const { state: profile } = useProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const user = profile?.user ?? Auth?.user;

  const HandlePostSubmit = async (formData) => {
    console.log(formData);
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        { formData }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.DATA_CREATED,
          data: response.data,
        });
        // Close this UI
        onCreate();
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
      <div className="card relative mt-4">
        <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
          Create Post
        </h6>
        <form onSubmit={handleSubmit(HandlePostSubmit)}>
          <div class="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
            <div class="flex items-center gap-3">
              <img
                class="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
                alt="avatar"
              />
              <div>
                <h6 class="text-lg lg:text-xl">
                  {user?.firstName} {user?.lastName}
                </h6>

                <span class="text-sm text-gray-400 lg:text-base">Public</span>
              </div>
            </div>
            <label
              className="btn-primary cursor-pointer !text-gray-100"
              htmlFor="photo"
            >
              <img src={AddPhoto} alt="Add Photo" />
              Add Photo
            </label>
            <input type="file" name="photo" id="photo" className="hidden" />
          </div>

          <Field label="" error={errors.content}>
            <textarea
              {...register("content", {
                required: "Adding some text is mandatory!",
              })}
              name="content"
              id="content"
              placeholder="Share your thoughts..."
              className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
            ></textarea>
          </Field>
          <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
            <button
              className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
              type="submit"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostEntry;
