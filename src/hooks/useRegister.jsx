import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        {
          email,
          password,
        }
      );

      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(response.data));

      // update AuthContext
      dispatch({ type: "LOGIN", payload: response.data });

      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setIsLoading(false);
        setError(error.response.data.error);
      }
    }
  };

  return { register, isLoading, error };
};
