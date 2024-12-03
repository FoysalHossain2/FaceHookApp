import axios from "axios";
import { useEffect } from "react";
import api from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { Auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = Auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = Auth?.refreshToken;
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh`,
              { refreshToken }
            );

            const { token } = refreshResponse.data;

            console.log(`New Token: ${token}`);
            setAuth({ ...Auth, authToken: token });

            // Update the authorization header with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;

            return axios(originalRequest);
          } catch (error) {
            console.error("Token refresh failed", error);
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [Auth, setAuth]);

  return { api };
};

export default useAxios;
