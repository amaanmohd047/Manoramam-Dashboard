import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";

import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      navigate("/login", { replace: true });
      toast.success("Logout successful!");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Logout failed!");
    },
  });
  return { logout, isLoading };
}
