import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkOut, isPending: checkingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully! 🎉`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
  });

  return { checkOut, checkingOut };
}
