import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrentUser, isLoading } = useMutation({
    mutationFn: updateCurrentUserAPI,
    mutationKey: ["user"],
    onSuccess: (user) => {
      console.log(user);
      queryClient.invalidateQueries(["user"]);
      queryClient.setQueryData(["user"], user.user);
      toast.success("Profile updated successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return { updateCurrentUser, isLoading };
}
