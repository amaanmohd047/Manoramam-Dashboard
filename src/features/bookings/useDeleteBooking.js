import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (e) => {
      toast.error(`🛑Could not delete room: ${e}`);
    },
  });

  return { isDeletingBooking, deleteBooking };
}
