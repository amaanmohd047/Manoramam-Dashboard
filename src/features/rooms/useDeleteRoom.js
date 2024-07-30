import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom as deleteRoomAPI } from "../../services/apiRooms";
import toast from "react-hot-toast";

export function useDeleteRoom() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteRoom } = useMutation({
    mutationFn: deleteRoomAPI,
    onSuccess: () => {
      toast.success("Room deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (e) => {
      toast.error(`🛑Could not delete room: ${e}`);
    },
  });

  return { isDeleting, deleteRoom };
}
