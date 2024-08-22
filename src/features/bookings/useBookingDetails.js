import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBookingDetails(bookingId) {
  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { booking, error, isLoading };
}
