import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useCreateRoom() {
  const queryClient = useQueryClient();
  const { reset } = useForm();
  const { mutate: createRoom, isPending: isCreating } = useMutation({
    mutationFn: createEditRoom,
    onSuccess: () => {
      toast.success("New room added successfully!");
      queryClient.invalidateQueries(["rooms"]);
      reset();
    },
    onError: (err) => {
      console.error(err);
      toast.error("UseCreateRoom.js " + err.message);
    },
  });
  return { createRoom, isCreating };
}
