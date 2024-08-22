import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ name, email, password }) =>
      signUp({ name, email, password }),
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please verify the new account via email."
      );
    },
  });

  return { signup, isSigningUp };
}
