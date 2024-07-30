import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export function useFetchRooms() {
  const {
    data: rooms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { rooms, isLoading, isError };
}
