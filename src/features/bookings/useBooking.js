import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBooking() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "arrivalDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : "1";

  // Fetch
  const {
    isError,
    isLoading,
    data: { data: bookings, count } = {},
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () =>
      getAllBookings({ filter: filter, sortBy: sortBy, page: page }),
  });

  // Pre-fetch next page
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () =>
        getAllBookings({ filter: filter, sortBy: sortBy, page: page - 1 }),
    });
  }
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () =>
        getAllBookings({ filter: filter, sortBy: sortBy, page: page + 1 }),
    });
  }

  return { bookings, isLoading, isError, count };
}
