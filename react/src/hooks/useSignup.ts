import { useNavigate } from "react-router-dom";
import { authenticationService } from "../services/authenticationService.ts";
import { useMutation } from "@tanstack/react-query";

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, SignupRequest>({
    mutationKey: ["signup"],
    mutationFn: authenticationService.signup,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });
};
