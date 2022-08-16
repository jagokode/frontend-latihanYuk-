import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        {
          email,
          password,
        }
      );

      console.log(response);

      // save user info to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // update auth context
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setIsLoading(false);
        setError(error.response.data.error);
      }
    }
  };

  return { login, isLoading, error };
};
