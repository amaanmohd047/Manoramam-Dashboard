import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useEditRoom() {
  const queryClient = useQueryClient();
  const {reset} = useForm();

  const { mutate: editRoom, isPending: isEditing } = useMutation({
    mutationFn: ({ roomData, id }) => createEditRoom(roomData, id),
    onSuccess: () => {
      toast.success("Room edited successfully!");
      queryClient.invalidateQueries(["rooms"]);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return {editRoom, isEditing}
}