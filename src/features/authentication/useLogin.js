import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Incorrect Email or Password");
    },
  });
  return { login, isLoading };
}
