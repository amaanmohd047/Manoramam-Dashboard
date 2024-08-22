import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkIn, isPending: checkingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast = {} }) =>
      updateBooking(bookingId, {
        isFullyPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully! 🎉`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
  });

  return { checkIn, checkingIn };
}
